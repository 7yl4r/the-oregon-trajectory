Tile = require('./Tile.coffee');  // TODO: can del this?
Phaser = require('phaser');

gameState = function(game){}

MIN_TRAVELS_PER_EVENT = 10;  // min amount of travel between events
EVENT_VARIABILITY = 2;  // affects consistency in event timing. high values = less consistent timing. must be > 0
// units of EVENT_VARIABILITY are fraction of MIN_TRAVELS_PER_EVENT, eg 3 means MIN_TRAV./3


gameState.prototype = {
	preload: require('./preload'),
  	create: require('./create'),
    render: function(){},
    update: require('./update'),
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
