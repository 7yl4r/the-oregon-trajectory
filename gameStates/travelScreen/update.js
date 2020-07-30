StatusDisplay = require('status-display');

module.exports = function(){
    if (!globalData.game.inMenu){  // check for menu pause
        travel(this);
        drawSprites(this);  // NOTE: is this ok every frame? there's gonna be duplicates...
        StatusDisplay.update(this.game);
    }
}
drawSprites = function(game){
    // add location sprites
    var upcomingEncounters = globalData.gameData.encounterManager.getNearbyEncounters({
        distance: globalData.gameData.distanceTraveled,
        searchWindow: game.width/2.0
    });
    // console.log('drawing ', upcomingEncounters.length, ' sprites');
    for (var encounter of upcomingEncounters){
        globalData.gameData.encounterManager.drawEncounterSprite(
            game,
            encounter,
            encounter.distance_px,
            game.height/2
        )
    }
}
