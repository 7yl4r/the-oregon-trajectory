Tile = require('./Tile.coffee')
Phaser = require('phaser')

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
        this.game.load.image('bg-earth', util.absPath('assets/backgrounds/bg.png'));
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

        require('pause-button').preload(this.game)
    },
    create: function(){
        this.randyTime = 0;

        // this.tiles = [
        //     new Tile(
        //         0,
        //         this.game.add.image(
        //             this.game.width/2,
        //             this.game.height/2,
        //             'bg-earth'
        //         )
        //     )
        // ];

        this.tileGroup = this.game.add.group();
        this.tileGroup.classType = Phaser.Image;
        this.tileGroup.setAll('outOfBoundsKill', true);
        this.tileGroup.setAll('checkWorldBounds', true);
        this.tileGroup.create(
            this.game.width,
            0,
            'bg-earth'
        );

        this.ship = this.game.add.sprite(
            300/this.game.width*this.game.width,
            this.game.height/2,
            'player-ship'
        );
        this.ship.anchor.setTo(0.5, 0.5);

        this.game.world.setBounds(0, 0, globalData.gameData.worldWidth, 600);

        this.game.camera.follow(this.ship);  // this is not working for me

        require('pause-button').create(this.game)
    },
    update: function(){
        if (!globalData.game.inMenu){  // check for menu pause
            travel(this);
        }
    },
    render: function(){
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
}

module.exports = gameState;

travel = function(gameState){
    if (globalData.gameData.fuel >= globalData.gameData.fuelExpense) {
        globalData.gameData.travel();

        gameState.ship.x += TRAVEL_SPEED;

        // TODO: append new bg tiles if needed
        var tileGroupWidth = 0;
        gameState.tileGroup.forEachExists(function(childTile){
            tileGroupWidth += childTile.width
        })
        var tileRightSide = gameState.tileGroup.x + tileGroupWidth;
        var screenRightEdge = -globalData.game.world.x + globalData.game.width;
        // console.log('tileEdge:' + tileRightSide + "\t screenEdge:" + screenRightEdge);
        if (tileRightSide < screenRightEdge){
            var newTileKey = getNextTile()
            console.log('add ' + newTileKey);
            gameState.tileGroup.create(
                screenRightEdge,
                0,
                newTileKey
            );
        }

        // handle arrival at stations/events
        // if (!globalData.gameData.BYPASS_LOCATIONS){
        //     for (var loc_i in globalData.gameData.locations){
        //         var location = globalData.gameData.locations[loc_i];
        //         var pos = location.x;
        //         var loc = location.name;
        //         if (pos < globalData.gameData.distanceTraveled &&
        //             globalData.gameData.visited.indexOf(loc) < 0) {  // passing & not yet visited
        //             globalData.gameData.visited.push(loc);
        //             globalData.gameData.encounter_object = location;  // store the location obj for use by the triggered module
        //             console.log('arrived at ', loc);
        //             // TODO:
        //             // globalData.gameData.locations[loc_i].trigger({'$scope':$scope})
        //         }
        //     }
        // }

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


getNextTile = function(){
    // if distance travelled to destination big enough, append destination tile, else use filler
    var halfTileWidth = 1000*TRAVELS_PER_MOVE;  // estimated width (should be close to avg) (in moves)
    if (globalData.gameData.nextWaypoint.distance < halfTileWidth ){
        console.log(globalData.gameData.nextWaypoint);
        // TODO: return relevant location tile
        if (globalData.gameData.nextWaypoint.name == 'moon'
            || globalData.gameData.nextWaypoint.name == 'mars'
            || globalData.gameData.nextWaypoint.name == 'ceres'
            || globalData.gameData.nextWaypoint.name == 'jupiter'
            || globalData.gameData.nextWaypoint.name == 'europa'
        ){
            return globalData.gameData.nextWaypoint.name;
        }
    }
    return 'filler';
}

// #####################
// code to port:
// #####################

// drift = function(height){
//     // returns slightly drifted modification on given height
//     if (Math.random() < 0.01) {  // small chance of drift
//         height += Math.round(Math.random() * 2 - 1);
//         if (height > 400) {
//             height = 399
//         } else if (height < 200) {
//             height = 201
//         }
//     }
//     return height;
// }
//
// drawSprite = function(location){
//     // draws location sprite if in view at global Xposition
//     // if w/in reasonable draw distance
//     var spriteW = 500;  // max sprite width (for checking when to draw)
//     var Xposition = location.x + vm.shipX;
//
//
//     if (data.distanceTraveled + window.innerWidth + spriteW > Xposition    // if close enough
//         && data.distanceTraveled - spriteW < Xposition                  ) { // if we haven't passed it
//         location.sprite.y = vm.drift(location.sprite.y);
//         location.sprite.r += location.sprite.spin;
//         var rel_x = Xposition-data.distanceTraveled;
//         location.sprite.x = rel_x;
//         // use existing y value (add small bit of drift)
//         location.sprite.draw(vm.ctx)
//     }
// }
//
// drawLocations = function(){
//     for (var loc_i in data.locations){
//         try {
//             vm.drawSprite(data.locations[loc_i]);
//         } catch (err){
//             console.log("drawSpriteLoc fails @ ", loc_i, 'of', data.locations.length, data.locations[loc_i]);
//         }
//     }
// }
//
// drawBg = function(){
//     vm.tiles.forEach(function(tile) {
//         tile.draw(vm.ctx);
//     });
// }
//
// drawShip = function(){
//     vm.shipY = vm.drift(vm.shipY);
//     vm.ship.draw(vm.ctx, vm.shipX, vm.shipY)
// }
//
// draw = function(){
//     // resize element to window
//     vm.ctx.canvas.width  = window.innerWidth;  //TODO: only do this when needed, not every draw
//     vm.drawBg();
//     vm.drawLocations();
//     vm.drawShip();
// }
//
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
