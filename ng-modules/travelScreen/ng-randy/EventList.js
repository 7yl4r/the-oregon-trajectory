/*

This file contains the list of in-travel random events.
Feel free to add your own events, I'll try and explain the syntax a bit here:
Each event is an object encapsulated by {}, so it looks like this:
{
    "type": "watevs",
    "name": "my-event",
}
Here is a breakdown of the event attributes:
    * name -

 */

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
            "function": "alert",
            "args": {
                "text": "hey look, a station... I sure wish some programmers would implement something for that..."
            }
        },
        "sprite":"randomStation"
    }
];