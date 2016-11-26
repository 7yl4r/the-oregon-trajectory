Tile = require('./Tile.coffee');
Phaser = require('phaser');
PauseButton = require('pause-button');
StatusDisplay = require('status-display');
drift = require('drift');

gameState = function(game){}

MIN_TRAVELS_PER_EVENT = 1000;  // min amount of travel between events
EVENT_VARIABILITY = 10;  // affects consistency in event timing. high values = less consistent timing. must be > 0
// units of EVENT_VARIABILITY are fraction of MIN_TRAVELS_PER_EVENT, eg 3 means MIN_TRAV./3

gameState.prototype = {
    preload: function() {
        // visual assets
        // ----------------
        this.game.load.image('filler', util.absPath('assets/backgrounds/filler.png'));
        this.game.load.image('moon', util.absPath('assets/backgrounds/moon.png'));
        this.game.load.image('earth', util.absPath('assets/backgrounds/bg.png'));
        this.game.load.image('mars', util.absPath('assets/backgrounds/mars.png'));
        this.game.load.image('ceres', util.absPath('assets/backgrounds/ceres.png'));
        this.game.load.image('jupiter', util.absPath('assets/backgrounds/jupiter.png'));
        this.game.load.image('europa', util.absPath('assets/backgrounds/europa.png'));

        this.game.load.image('player-ship', util.absPath('assets/sprites/ship.png'));

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
        this.randyTime = 0;

        this.tileGroup = this.game.add.group();
        this.tileGroup.classType = Phaser.Image;
        this.tileGroup.setAll('outOfBoundsKill', true);
        this.tileGroup.setAll('checkWorldBounds', true);
        addTile(this.game, this.tileGroup, 'earth')

        globalData.gameData.locationArrivalSignal.add((function(_game, _tileGroup){
            return function(tileName){
                console.log('adding location tile: ' + tileName);
                addTile(_game, _tileGroup, tileName);
            }
        })(this.game, this.tileGroup));

        this.SHIP_INITIAL_POS = 300;
        this.ship = this.game.add.sprite(
            this.SHIP_INITIAL_POS,
            this.game.height/2,
            'player-ship'
        );
        this.ship.anchor.setTo(0.5, 0.5);
        this.ship.update = function(){
            this.y = drift(this.y)
        }
        this.game.world.setBounds(0, 0, globalData.gameData.worldWidth, 600);
        this.game.camera.follow(this.ship);

        for (var loc_i in globalData.gameData.locations){
            globalData.gameData.locations[loc_i].addLocationSprite(this, globalData.gameData, globalData.gameData.locations[loc_i])
        }

        PauseButton.create(this.game);
        StatusDisplay.create(this.game);
    },
    update: function(){
        if (!globalData.game.inMenu){  // check for menu pause
            travel(this);
            StatusDisplay.update(this.game);
        }
    },
    render: function(){
        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
}

module.exports = gameState;

addTile = function(game, tileGroup, newTileKey){
    // adds a tile to the scrolling background
    console.log('add ' + newTileKey);
    tileGroup.create(
        getScreenRightEdge(game),
        0,
        newTileKey
    );
}

getScreenRightEdge = function(game){
    return -game.world.x + game.width;
}

travel = function(gameState){
    if (globalData.gameData.fuel >= globalData.gameData.fuelExpense) {
        globalData.gameData.travel();

        gameState.ship.x += TRAVEL_SPEED;

        // append new filler bg tiles if needed
        var tileGroupWidth = 0;
        gameState.tileGroup.forEachExists(function(childTile){
            tileGroupWidth += childTile.width
        })
        var tileRightSide = gameState.tileGroup.x + tileGroupWidth;
        var screenRightEdge = getScreenRightEdge(globalData.game);
        // console.log('tileEdge:' + tileRightSide + "\t screenEdge:" + screenRightEdge);

        if (tileRightSide < screenRightEdge){
            // NOTE: could choose rand filler here
            addTile(gameState.game, gameState.tileGroup, 'filler');
        }

        // handle arrival at stations/events
        if (!globalData.gameData.BYPASS_LOCATIONS){
            for (var loc_i in globalData.gameData.locations){
                var location = globalData.gameData.locations[loc_i];
                var pos = location.x;
                var loc = location.name;
                if (pos < globalData.gameData.distanceTraveled &&
                    globalData.gameData.visited.indexOf(loc) < 0) {  // passing & not yet visited
                    globalData.gameData.visited.push(loc);
                    globalData.gameData.encounter_object = location;  // store the location obj for use by the triggered module
                    console.log('arrived at ', loc);
                    globalData.gameData.locations[loc_i].trigger({state:gameState, data:globalData.gameData});
                }
            }
        }

        // handle random events
        // TODO: if is a good time/place for an event
        if (this.randyTime > MIN_TRAVELS_PER_EVENT){
            if (randy.roll()){
                this.randyTime = 0
            } else {
                this.randyTime = MIN_TRAVELS_PER_EVENT/EVENT_VARIABILITY
            }
        } else {
            this.randyTime += 1
        }
    }
    // TODO: else if within range of shop and have money, switch to shop screen module to buy fuel
    else { // end game
        globalData.gameData.end();
    }
}


// #####################
// code to port:
// #####################

_getIdealShipPos = function(){
    return window.innerWidth / 3
}
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
