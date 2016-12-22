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
    getLocation(distance, units='px'){
        // returns location for the given distance from start location
        // expects distance in px
        // console.log('loc @ x=',distance,':');
        for (var locI = 0; locI < this.locations.length; locI++){
            var loc = this.locations[locI];
            if (loc.getDistance(units) < distance){
                continue;
            } else {
                // console.log(this.locations[locI]);
                return this.locations[locI];
            }
        }  // else we've passed all locations
        console.warn('passed all locations!');
    }
    preload(game){
        // TODO: load these from
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
    var result = new Location(args.base);
    for (var key in args){
        if (key != 'base'){
            result[key] = args[key];
        }
    }
    result.distance_px = (result.distance + result.distance_adj) * args.pxPerAU;
    result.x = result.distance_px;  // legacy TODO remove
    result.spriteKey = result.key;  // legacy TODO remove
    console.log()
    return result;
}

class Location {
    constructor(args){
        for (var key in args){
            this[key] = args[key];
        }
    }
    getDistance(units){
        // returns distance from start in given units (defaults to AU)
        if (units == 'px' && typeof(this.distance_px) != 'undefined'){
            return this.distance_px;
        } else if (units == 'AU' && typeof(this.distance) != 'undefined') {
            return this.distance;
        } else {
            console.warn('unknown distance to loc ', this);
            return Infinity;
        }
    }
}

module.exports = LocationManager
