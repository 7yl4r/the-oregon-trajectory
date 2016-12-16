loadSpriteSheet = require('load-spritesheet');

class EncounterManager {
    constructor(trajJSON) {
        this.LANDMARK = trajJSON.LANDMARK;
        this.encounters = [];  // not yet enountered, sorted by distance_px
        this.potentialEncounters = [];  // not yet added to encounters
        this.passedEncounters = [];  // passed encounters, in order of encounter
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
        return this.passedEncounters[this.passedEncounters.length-1];
    }

    triggerNextEncounter(gameData, travelScreenState){
        var encounter = this.encounters.shift();

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

    getNearbyEncounters(args){
        // retuns array of nearby encounters
        // distance: location to check around [px]
        // searchWindow: how far to look around given distance [px]
        var minDist = args.distance - args.searchWindow;
        var maxDist = args.distance + args.searchWindow;
        var result = [];

        // get last few passedEncounters
        for (var i = this.passedEncounters.length-1; i > -1; i--){
            if (this.passedEncounters[i].distance_px > minDist){
                result.push(this.passedEncounters[i]);
            } else {
                break;  // don't bother searching the rest
            }
        }

        // get first few next encounters
        for (var i = 0; i < this.encounters.length; i++){
            if (this.encounters[i].distance_px < maxDist){
                result.push(this.encounters[i]);
            } else {
                break;
            }
        }

        return result;
    }

    // STATIC
    drawEncounterSprite(phaserGame, encounter, x, y){
        // # draws encounter sprite if in view at global Xposition
        // # if w/in reasonable draw distance
        // # TODO: add rotation
        try {
            encounter.sprite = phaserGame.add.sprite(
                x,
                drift(y),
                this.spriteKey
            );
            encounter.sprite.animations.add('animation1');
            encounter.sprite.animations.play('animation1', 2, true);
            encounter.sprite.anchor.setTo(0.5, 0.5);
            encounter.sprite.update = function(){
                this.y = drift(this.y)
            }
        }catch (error){  //# probably spriteKey not found
            console.warn(error)
        }

        // # console.log('sprite added for ', encounter);
        // # window.currentLocation = encounter;
    }
}

module.exports = EncounterManager
