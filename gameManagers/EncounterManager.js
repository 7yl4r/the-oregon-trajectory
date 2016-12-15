loadSpriteSheet = require('load-spritesheet');

class EncounterManager {
    constructor(trajJSON) {
        this.LANDMARK = trajJSON.LANDMARK;
        this.encounters = [];  // not yet enountered, sorted by distance_px
        this.potentialEncounters = [];  // not yet added to encounters
        this.passedEncounters = [];  // passed encounters, in order of encounter
        this.visited = ['ksc'];
        this.nextEncounterDistance_px = Infinity;

        for (var loc of trajJSON.trajectory.locations){
            this.addEncounter(loc.landmark);
        }

        // for debug:
        $(document).on('switch-state', function(event){
            console.log('switch state', event.data);
        });
    }

    addEncounter(newEnc){
        this.encounters.push(newEnc);
        if (newEnc.distance_px < this.nextEncounterDistance_px){
            this.nextEncounterDistance_px = newEnc.distance_px;
        }
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

    triggerNextEncounter(gameData, travelScreenState){
        var encounter = this.encounters.shift();

        this.visited.push(encounter.name);
        console.log('encountering ', encounter);
        gameData.encounter_object = encounter;  // store the location obj for use by the triggered module
        for (var trigger of encounter.onArrivalTriggers){
            $(document).trigger(trigger.key, undefined, trigger.payload);
        }

        this.passedEncounters.push(encounter);

        this.nextEncounterDistance_px = this.encounters[0].distance_px;
    }

    checkForEncounter(gameData, travelScreenState){
        // triggers encounters it if needed.
        // handle arrival at stations/events
        if (this.nextEncounterDistance_px > gameData.distanceTraveled){
            this.triggerNextEncounter(gameData, travelScreenState);
        }
    }
}

module.exports = EncounterManager
