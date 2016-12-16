drift = require('drift')

class LocationManager {
    constructor(trajJSON) {
        for (var location of trajJSON.trajectory.locations){
            location.locObj = buildLocation(location);
        }
    }
    setLocations(encountersJSON){
        // sets potential encounters array
        // TODO:
        console.log('set locations');
    }
    preload(game){
        game.load.image('filler', util.absPath('assets/backgrounds/filler.png'));
        game.load.image('moon', util.absPath('assets/backgrounds/moon.png'));
        game.load.image('earth', util.absPath('assets/backgrounds/bg.png'));
        game.load.image('mars', util.absPath('assets/backgrounds/mars.png'));
        game.load.image('ceres', util.absPath('assets/backgrounds/ceres.png'));
        game.load.image('jupiter', util.absPath('assets/backgrounds/jupiter.png'));
        game.load.image('europa', util.absPath('assets/backgrounds/europa.png'));
    }
}


class Location {
    // # constructor: (name, x, spriteKey=undefined, trigger=undefined)->
    // #     # console.log('new Loc(', name, x, actionKey, '):', this)
    // #     this.name = name
    // #     this.x = x
    // #     this.spriteKey = spriteKey
    // #
    // #     if spriteKey?
    // #         this.spriteKey = spriteKey
    // #     else
    // #         this.spriteKey = name
    constructor(locJSON){
        // # console.log('new Loc(', name, x, actionKey, '):', this)
        this.name = locJSON.name;
        this.x = locJSON.distance_px;
        this.spriteKey = locJSON.key;
    }
}

buildLocation = function(locJSON){
    // # location builder
    // # console.log('build', locJSON)
    return new Location(locJSON);
}

module.exports = LocationManager
