/*

This file contains the list of in-travel random events.
Feel free to add your own events, I'll try and explain the syntax a bit here:
Each event is an object encapsulated by {}, so it looks like this:
{
    "type": "watevs",
    "name": "my-event",
}
Here is a breakdown of the event attributes:
    * name - a unique name for your event.
    * chance - the chance of encountering your event at each event point (imagine all other events are not there)
    * triggeredAction - (see ./Event.coffee setTriggerFunction() for details)
        * function - key for function to be fired when your event is activated
        * args - arguments to pass to the activation function
    * sprite - key used to set the sprite (see ./Event.coffee getSprite() for details)
    * criteria - NOT YET IMPLEMENTED, feel free to leave this out for now
 */

PHANTOM_SIGNAL = require("./situations/phantomSignal.coffee");
MEDICINE = require("./situations/medicine.coffee");
SOLAR_FLARE = require("./situations/solarFlare.coffee");

// procedural sprite types
// SPRITE_TYPES = {
//     randomDebris: "randomDebris",
//     randomStation: "randomStation",
//     randomAsteroid: "randomAsteroid"
// }

module.exports = {
    preload: function(game){
        game.load.image('satelite-debris-1', util.absPath('assets/sprites/debris-satellite.png'));

        for (var N = 0; N < 18; N++){
            game.load.image('station-' + N, util.absPath('assets/sprites/randomStation/' + N + '.png'));
        }

        n_asteroids = 33.0;  //# actual count is this +1
        for (var N = 0; N < n_asteroids; N++){
            fname = 'assets/sprites/asteroids/' + N + '.png'
            switch (N){
                case 14:
                    fname = 'assets/sprites/asteroids/rosetta/sprites.png'
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                    // 0-9
                    fname = 'assets/sprites/asteroids/rosetta/0' + (N-14) + '.png';
                    break;
                case 24:
                case 25:
                case 26:
                    // 10-12
                    fname = 'assets/sprites/asteroids/rosetta/' + (N-14) + '.png';
                    break;
                case 33:
                    fname = 'assets/sprites/asteroids/p0.png'  //# POTATO!
                    break;
            }
            game.load.image('asteroid-' + N, util.absPath(fname));
        }
        game.load.image('spec', util.absPath('assets/sprites/spec.png'))
    },

    list: [
            {
                "name": "space-junk",
                "criteria": {
                    "locations": ['earth']
                },
                "chance": 0.4,
                "triggeredAction": {
                    "function": "switchToModule",
                    "args": {
                        "moduleName": "debris-encounter"
                    }
                },
                "sprite":"randomDebris"
            },{
                "name": "micro-meteroid",
                "criteria":{},
                "chance": 0.6,
                "triggeredAction": {
                    "function": "switchToModule",
                    "args": {
                        "moduleName": "asteroid-mining"
                    }
                },
                "sprite": "randomAsteroid"
            },{
                "name": "trading-post",
                "criteria":{},
                "chance": 0.2,
                "triggeredAction": {
                    "function": "switchToModule",
                    "args": {
                        "moduleName": "trader"
                    }
                },
                "sprite":"randomStation"
            },{
                "name": "phantom-signal",
                "criteria":{},
                "chance": 0.1,
                "triggeredAction": {
                    "function": "switchToModule",
                    "args": {
                        "moduleName": "situation",
                        "moduleArgs": PHANTOM_SIGNAL
                    }
                }
            },{
                "name": "medicine",
                "criteria":{},
                "chance": 0.1,
                "triggeredAction": {
                    "function": "switchToModule",
                    "args": {
                        "moduleName": "situation",
                        "moduleArgs": MEDICINE
                    }
                }
            },{
                "name": "solar-flare",
                "criteria":{},
                "chance": 0.1,
                "triggeredAction": {
                    "function": "switchToModule",
                    "args": {
                        "moduleName": "situation",
                        "moduleArgs": SOLAR_FLARE
                    }
                }
            }
    ]
}
