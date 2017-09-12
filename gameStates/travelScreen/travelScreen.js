Tile = require('./Tile.coffee');
Phaser = require('phaser');
PauseButton = require('pause-button');
StatusDisplay = require('status-display');
drift = require('drift');
EventList = require('EventList');

gameState = function(game){}

MIN_TRAVELS_PER_EVENT = 10;  // min amount of travel between events
EVENT_VARIABILITY = 2;  // affects consistency in event timing. high values = less consistent timing. must be > 0
// units of EVENT_VARIABILITY are fraction of MIN_TRAVELS_PER_EVENT, eg 3 means MIN_TRAV./3

gameState.prototype = {
    preload: function() {
        game = this.game;
        data = globalData.gameData;
        // #################
        // # visual assets #
        // #################
        // backgrounds:
        data.locationManager.preload(game);

        // player ship:
        game.load.image('player-ship', util.absPath('assets/sprites/ship.png'));

        data.encounterManager.preload(game);

        EventList.preload(game);

        // // TODO could include more in spec using a more advanced loader.
        // // Example usage of loader might be like:
        // SpriteSpecLoader.load(game, 'sprite-key', require('../path/to/spriteSpec.js'));
        // // loader loads files, but holds onto animation data from spec for later
        // sprite = add.sprite('tag');
        // // setup uses saved animation data from spec to set animations and play
        // SpriteSpecLoader.setup(sprite, 'sprite-key');
        // // setup does something like to:
        // //      foreach animation in specs[key].animations
        // //      sprite.animations.add(animation.key, animation.frames);
        // SpriteSpecLoader.play(sprite, 'sprite-key', 'anim-key')
        // //      sprite.animations.play(animation.key, animation.fps);


        // ----------------
        // music assets
        // ----------------
        // game.load.audio('TAG', 'FILE-PATH.mp3');
        // music.theme = new Howl({
        //     urls: ['assets/sound/music/theme/theme.mp3', 'assets/sound/music/theme/theme.ogg'],
        // music.ambience = new Howl({
        //     urls: ['assets/sound/music/ambience1/ambience1.mp3', 'assets/sound/music/ambience1/ambience1.ogg'],
        // music.asteroidMining = new Howl({
        //     urls: [
        //         'assets/sound/music/asteroidMining/asteroidMining.mp3',
        //         'assets/sound/music/asteroidMining/asteroidMining.ogg'
        //     ],
        // music.losing = new Howl({
        //     urls: ['assets/sound/music/Losing.ogg', 'assets/sound/music/Losing.mp3'],
        // music.winning = new Howl({
        //     urls: ['assets/sound/music/winning/winning.ogg', 'assets/sound/music/winning/winning.mp3'],

        // ----------------
        // sound assets
        // ----------------
        // sounds.click = new Howl({
        //     urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
        // sounds.bummer = new Howl({
        //     urls: [
        //         'assets/sound/effects/somethingbad/SomethingBad.mp3',
        //         'assets/sound/effects/somethingbad/SomethingBad.ogg'
        // sounds.shot1 = new Howl({
        //     urls: [
        //         'assets/sound/effects/shot1/shot1.mp3',
        //         'assets/sound/effects/shot1/shot1.ogg',
        //         'assets/sound/effects/shot1/shot1.wav'
        // sounds.shot2 = new Howl({
        //     urls:[
        //         'assets/sound/effects/shot2/shot2.mp3',
        //         'assets/sound/effects/shot2/shot2.ogg'
        // sounds.clunk = new Howl({
        //     urls:[
        //         'assets/sound/effects/clunk/clunk.mp3',
        //         'assets/sound/effects/clunk/clunk.ogg',
        //         'assets/sound/effects/clunk/clunk.wav'
        // sounds.propel = new Howl({
        //     urls:[
        //         'assets/sound/effects/propellant/propellant.mp3',
        //         'assets/sound/effects/propellant/propellant.ogg',
        //         'assets/sound/effects/propellant/propellant.wav'

        // ----------------
        // plugins
        // ----------------
        require('slick-ui-preload')();

        PauseButton.preload(this.game)
        StatusDisplay.preload(this.game)
    },
    create: function(){
        console.log('create travelScreen');
        this.randyTime = 0;

        this.tileGroup = this.game.add.group();
        this.tileGroup.classType = Phaser.Image;
        // this.tileGroup.setAll('outOfBoundsKill', true);
        // this.tileGroup.setAll('checkWorldBounds', true);
        this.shownTileKeys = [];

        updateBackgroundTiles(this);

        this.SHIP_INITIAL_POS = 0;
        this.ship = this.game.add.sprite(
            this.SHIP_INITIAL_POS,
            this.game.height/2,
            'player-ship'
        );
        this.ship.anchor.setTo(0.5, 0.5);
        this.ship.update = function(){
            this.y = drift(this.y)
        }
        this.game.world.setBounds(-200, 0, globalData.gameData.worldWidth, 600);
        this.game.camera.follow(this.ship);

        this.tileGroup.x = globalData.gameData.distanceTraveled;
        window.travelScreen = this;

        PauseButton.create(this.game);
        StatusDisplay.create(this.game);

        globalData.gameData.eventManager.on("encounter", (function(gameState){
            return function(event){
                // TODO: handle encounter
                var eventSprite = gameState.game.add.sprite(
                    gameState.game.camera.x + gameState.game.width,
                    gameState.game.height/2,
                    'satelite-debris-1'
                );
                console.log('encounter:', event, 'sprite:', eventSprite);
            }
        })(this));
    },
    update: function(){
        if (!globalData.game.inMenu){  // check for menu pause
            travel(this);
            this.drawSprites();  // NOTE: is this ok every frame? there's gonna be duplicates...
            StatusDisplay.update(this.game);
        }
    },
    render: function(){
        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    },
    drawSprites: function(){
        // add location sprites
        var upcomingEncounters = globalData.gameData.encounterManager.getNearbyEncounters({
            distance: globalData.gameData.distanceTraveled,
            searchWindow: this.game.width/2.0
        });
        // console.log('drawing ', upcomingEncounters.length, ' sprites');
        for (var encounter of upcomingEncounters){
            globalData.gameData.encounterManager.drawEncounterSprite(
                this.game,
                encounter,
                encounter.distance_px,
                this.game.height/2
            )
        }
    }
}

module.exports = gameState;

addTile = function(game, tileGroup, newTileKey){
    // adds a tile to the scrolling background
    // console.log('add ' + newTileKey);
    tileGroup.create(
        getScreenRightEdge(game) - tileGroup.x,
        0,
        newTileKey
    );
}

getScreenRightEdge = function(game){
    return -game.world.x + game.width;
}

updateBackgroundTiles = function(gameState){
    // appends bg tiles if needed
    var HALF_TILE_W = 500;  // guestimate of avg half-tile width
    var tileGroupWidth = 0;
    gameState.tileGroup.forEachExists(function(childTile){
        tileGroupWidth += childTile.width
    });
    var tileRightSide = gameState.tileGroup.x + tileGroupWidth;
    var screenRightEdge = getScreenRightEdge(globalData.game);

    if (tileRightSide < screenRightEdge){
        // console.log('grp.w:', tileGroupWidth, '\t grp.x:', gameState.tileGroup.x,
        //             '\t grp.right:', tileRightSide, "\t screenEdge:", screenRightEdge)
        var kkey = globalData.gameData.locationManager.getLocation(
            globalData.gameData.getDistanceTraveled('px')
        ).key;
        if (typeof(kkey) == 'undefined'){
            addTile(gameState.game, gameState.tileGroup, 'filler');
        } else {
            if (!gameState.shownTileKeys.includes(kkey)){
                gameState.shownTileKeys.push(kkey)
                addTile(gameState.game, gameState.tileGroup, kkey);
            }  // else already displayed this tile
        }
    }
}

travel = function(gameState){
    // console.log('travelScreen.travel');
    if (globalData.gameData.fuel >= globalData.gameData.fuelExpense) {
        globalData.gameData.travel(gameState);

        gameState.ship.x = globalData.gameData.distanceTraveled;

        updateBackgroundTiles(gameState);

        // handle random events
        // NOTE: could check if is a good time/place for an event first.
        if (globalData.gameData.randy.roll()){
            // console.log('event!');
        }
    }
    // TODO: else if within range of shop and have money, switch to shop screen module to buy fuel
    else { // end game
        globalData.gameData.eventManager.trigger(EVENTS.GAME_OVER);
    }
}

// #####################
// code left to port:
// #####################
//
// $scope.$on('encounter', function(ngEvent, event){
//     // on random encounter
//     // NOTE: ngEvent here is the angular event, "event" is the ng-randy event... (sorry for confuzzlation)
//     console.log('adding encounter:', ngEvent, event);
//     // TODO: wrap this in data.addLocation method which checks that no locations are too near each other
//     vm.data.locations.push(new Location(
//         event.name + '_' + event.count,
//         vm.data.distanceTraveled + window.innerWidth + 300,
//         0,
//         ngEvent.name,
//         event.doAction,
//         event.sprite
//     ));
// });
