loadSpriteSheet = require('load-spritesheet');
drift = require('drift');

class EncounterManager {
    constructor(trajJSON) {
        this.LANDMARK = trajJSON.LANDMARK;
        this.encounters = [];  // not yet enountered, sorted by distance_px
        this.potentialEncounters = [];  // not yet added to encounters
        this.passedEncounters = [];  // passed encounters, in order of encounter
        this.nextEncounterDistance_px = Infinity;

        for (var loc of trajJSON.trajectory.locations){
            // console.log('adding encounters for loc ', loc.name, '...');
            this.addEncounter(loc.landmark, trajJSON.trajectory.pixelsPerAU);
            // console.log(loc.landmark.name);
        }
    }

    addEncounter(newEnc, pixelsPerAU){
        // console.log('addEnc', newEnc, pixelsPerAU);
        newEnc.distance_px = newEnc.distance * pixelsPerAU;
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
            // console.log('preload encounter:', encounter.name, encounter.spriteSpec);
        }
    }

    getLastEncounter(){
        // # AKA getLastEvent
        // # returns most recently triggered event/location
        return this.passedEncounters[this.passedEncounters.length-1];
    }

    triggerNextEncounter(gameData, travelScreenState){
        try {
            var encounter = this.encounters.shift();

            // console.log('encountering ', encounter);
            gameData.encounter_object = encounter;  // store the location obj for use by the triggered module
            for (var trigger of encounter.onArrivalTriggers){
                gameData.eventManager.trigger(trigger.key, trigger.payload);
            }

            this.passedEncounters.push(encounter);

            this.nextEncounterDistance_px = this.encounters[0].distance_px;
        } catch (error){
            console.error('no encounters left! err: ');
            throw error;
        }
    }

    checkForEncounter(gameData, travelScreenState){
        // triggers encounters it if needed.
        // handle arrival at stations/events
        // console.log('nextEncDist=',this.nextEncounterDistance_px, '<', gameData.distanceTraveled, '?');
        if (this.nextEncounterDistance_px < gameData.distanceTraveled){
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
            // console.log(this.passedEncounters[i].distance_px, '>', minDist, '?');
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

        // console.log('approaching ', result.length, 'encounters');
        return result;
    }

    // STATIC
    drawEncounterSprite(phaserGame, encounter, x, y){
        // # draws encounter sprite
        // # TODO: add rotation
        // console.log('g:',phaserGame,'e:',encounter,'x:',x,'y:',y);
        if (!encounter.sprite){
            try {
                encounter.sprite = phaserGame.add.sprite(
                    x,
                    y,
                    encounter.spriteKey
                );
                try {
                    encounter.sprite.animations.add('animation1');
                    encounter.sprite.animations.play('animation1', 2, true);
                } catch(error){
                    // assume that it's just a sprite w/ no animation
                }
                encounter.sprite.anchor.setTo(0.5, 0.5);
                encounter.sprite.update = function(){
                    this.y = drift(this.y);
                }
                encounter.sprite.outOfBoundsKill = true;
                encounter.sprite.checkWorldBounds = true;
                // console.log('encounter drawn:', encounter.sprite);
                window.sprit = encounter.sprite;
            }catch (error){
                console.error('cannot draw sprite @(',x,',',y,')',
                    'enc:', encounter,
                    'game', phaserGame,
                    'ERR:', error
                );
            }
        }
        // # console.log('sprite added for ', encounter);
        // # window.currentLocation = encounter;
    }
}

module.exports = EncounterManager
