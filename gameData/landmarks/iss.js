EVENTS = require('gameEvents');

module.exports = {
    name: "International Space Station",
    spriteKey: "iss",
    spriteSpec: require("../../assets/sprites/stations/iss/spriteSpec"),
    onArrivalTriggers: [
        {
            key: EVENTS.SWITCH_STATE,
            payload: {
                newState: "shop"
            }
        }
    ]
}
