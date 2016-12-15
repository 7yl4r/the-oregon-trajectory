loadSpriteSheet = require('load-spritesheet');

class EncounterManager {
    constructor(trajJSON) {
        this.LANDMARK = trajJSON.LANDMARK;
        this.encounters = [];
        this.visited = ['ksc'];

        for (var loc of trajJSON.trajectory.locations){
            this.addEncounter(loc.landmark);
        }
        window.testTraj = trajJSON.trajectory.locations;
    }

    addEncounter(newEnc){
        this.encounters.push(newEnc);
    }

    setPotentialEncounters(encountersJSON){
        // sets potential encounters array
        // TODO:
        console.log('set pot enc');
    }

    preload(game){
        // console.log('preloading encounters', this.encounters);
        for (var encounter of this.encounters){
            loadSpriteSheet(game, encounter.spriteKey, encounter.spriteSpec);
            // console.log('encounter:', encounter);
        }
        // // maneuver marker:
        // loadSpriteSheet(game, 'maneuver', require('../assets/sprites/maneuver-node/spriteSpec'));
        // // landmark sprites:
        // loadSpriteSheet(game, this.LANDMARK.ISS+'-station', require('../assets/sprites/stations/iss/spriteSpec'));
        // loadSpriteSheet(game, this.LANDMARK.MOON+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
        // loadSpriteSheet(game, this.LANDMARK.MARS+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
        // loadSpriteSheet(game, this.LANDMARK.CERES+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
        // loadSpriteSheet(game, this.LANDMARK.EUROPA+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
    }

    getLastEncounter(){
        // # AKA getLastEvent
        // # returns most recently triggered event/location
        // # returns null if no event yet triggered
        var lastName = this.visited[this.visited.length-1];
        for (var enc of this.encounters){
            if (enc.name == lastName){
                return enc;
            }
        }  // else
        return null;
    }

    checkForEncounter(gameData, travelScreenState){
        // triggers encounters it if needed.
        // handle arrival at stations/events
        for (var location of gameData.trajectory.locations){
            var pos = location.distance_px;
            var loc = location.name;
            if (pos < gameData.distanceTraveled &&
                this.visited.indexOf(loc) < 0) {  // passing & not yet visited
                this.visited.push(loc);
                gameData.encounter_object = location;  // store the location obj for use by the triggered module
                console.log('arrived at ', loc);
                location.locObj.trigger({state:travelScreenState, data:gameData});
            }
        }
    }
}

module.exports = EncounterManager
