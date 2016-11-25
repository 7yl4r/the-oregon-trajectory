gameState = function(game){}

MIN_TRAVELS_PER_EVENT = 1000;  // min amount of travel between events
EVENT_VARIABILITY = 10;  // affects consistency in event timing. high values = less consistent timing. must be > 0
// units of EVENT_VARIABILITY are fraction of MIN_TRAVELS_PER_EVENT, eg 3 means MIN_TRAV./3

gameState.prototype = {
    preload: function() {
        // visual assets
        this.game.load.image('filler', util.absPath('assets/backgrounds/filler.png'));
        this.game.load.image('moon', util.absPath('assets/backgrounds/moon.png'));
        this.game.load.image('bg-earth', util.absPath('assets/backgrounds/bg.png'));
        this.game.load.image('mars', util.absPath('assets/backgrounds/mars.png'));
        this.game.load.image('ceres', util.absPath('assets/backgrounds/ceres.png'));
        this.game.load.image('jupiter', util.absPath('assets/backgrounds/jupiter.png'));
        this.game.load.image('europa', util.absPath('assets/backgrounds/europa.png'));

        this.game.load.image('player-ship', util.absPath('assets/sprites/ship.png'));

        // plugins
        require('slick-ui-preload')();

        require('pause-button').preload(this.game)
    },
    create: function(){

        // vm.tiles = [new Tile(0, document.getElementById("bg-earth"))];
        this.bg = this.game.add.image(
            this.game.width/2,
            this.game.height/2,
            'bg-earth'
        );
        this.bg.anchor.setTo(0, 0.5);

        this.bg = this.game.add.image(
            this.game.width/2,
            this.game.height/2,
            'player-ship'
        );
        this.bg.anchor.setTo(0.5, 0.5);

        // vm.sprites = {}
        // vm.shipY = 300;
        // vm.shipX = 0+vm.ship.w/2;
        // vm.travelling = false;
        //
        // vm.startTravel();

        require('pause-button').create(this.game)
    },
    update: function(){
        if (!globalData.game.inMenu){  // check for menu pause
            this.bg.x -= 1;
            travel();
        }
    },
    render: function(){

    }
}

module.exports = gameState;

travel = function(){
    if (globalData.gameData.fuel >= globalData.gameData.fuelExpense) {
        globalData.gameData.travel();

        // move ship to optimal screen position
        if (vm.shipX < vm._getIdealShipPos()) {
            vm.shipX += 1;
            globalData.gameData.distanceTraveled += 1
        } else {
            vm.shipX = vm._getIdealShipPos();
        }

        // move the tiles
        vm.tiles.forEach(function (tile) {
            tile.travel();
        });

        // remove old offscreen tiles
        while (vm.tiles[0].hasTravelledOffscreen()) {
            vm.tiles.splice(0, 1);  // remove leftmost tile
            console.log('tile removed');
        }

        // append new bg tiles if needed
        var overhang = vm.tiles[vm.tiles.length - 1].getOverhang();
        while (overhang < 100) {
            vm.tiles.push(vm.getNextTile(window.innerWidth + overhang));
            overhang = vm.tiles[vm.tiles.length - 1].getOverhang();
            console.log('tile added');
            if (vm.tiles.length > 100){
                throw new Error('too many tiles!');
            }
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
                    globalData.gameData.locations[loc_i].trigger({'$scope':$scope})
                }
            }
        }

        // handle random events
        // TODO: if is a good time/place for an event
        if (randyTime > MIN_TRAVELS_PER_EVENT){
            if (randy.roll()){
                randyTime = 0
            } else {
                randyTime = MIN_TRAVELS_PER_EVENT/EVENT_VARIABILITY
            }
        } else {
            randyTime += 1
        }
    }
    // TODO: else if within range of shop and have money, switch to shop screen module to buy fuel
    else { // end game
        vm.stopTravel();
        globalData.gameData.end();
    }
}


// #####################
// code to port:
// #####################
// var timeoutId;
//
// $scope.$on('resetGame', vm.init);
//
// // PRIVATE FUNCTION
// var cancelInterval = function() {
//     var result = $interval.cancel(timeoutId);
//     if (result == true) timeoutId = undefined;
// }
//
// stopTravel = function(){
//     vm.travelling = false;
//     cancelInterval();
// }
//
// toggleTravel = function(){
//     if (vm.travelling){
//         vm.stopTravel();
//     } else {
//         vm.startTravel();
//     }
// };
//
getNextTile = function(xpos){
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
            img = document.getElementById(globalData.gameData.nextWaypoint.name);
        } else {
            // filler
            img = document.getElementById("filler");
        }
    } else {
        // filler
        img = document.getElementById("filler");
    }
    // return tile
    return new Tile(xpos, img);
}

//
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
// _getIdealShipPos = function(){
//     return window.innerWidth / 3
// }
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
