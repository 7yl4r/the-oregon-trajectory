drift = require('drift')

class LocationManager {
    constructor(trajJSON) {
        this.setLocations(trajJSON);
    }
    setLocations(trajJSON){
        // sets locations
        this.locations = [];
        for (var location of trajJSON.trajectory.locations){
            location = buildLocation({
                base: location,
                pxPerAU: trajJSON.pixelsPerAU
            });
            this.locations.push(location);
        }
    }
    getLocation(distance){
        // returns location for the given distance from start location
        // expects distance in AU
        var res = this.locations[0];
        for (var loc of this.locations){
            if (loc.distance+loc.distance_adj < distance){
                res = loc;
            } else {
                return res;
            }
        }  // else we've passed all locations
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

function buildLocation(args){
    // constructs data object onto base
    // base: base json to use for the landmarks
    // pxPerAU: pixels per AU conversion factor
    // all other key-val pairs are added to json and can overload attribs on json.
    var result = args.base;
    for (var key in args){
        if (key != 'base'){
            result[key] = args[key];
        }
    }
    result.distance_px = result.distance * args.pxPerAU;
    result.x = result.distance_px;  // legacy TODO remove
    result.spriteKey = result.key;  // legacy TODO remove
    return result;
}

module.exports = LocationManager
