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

module.exports = [
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
            "function": "alert",
            "args": {
                "text": "CLINK! Did you hear that?!? ... ... ... Probably nothing."
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
        "chance": .05,
        "triggeredAction": {
            "function": "switchToModule",
            "args": {
                "moduleName": "situation",
                "moduleArgs": PHANTOM_SIGNAL
            }
        }
    }
];