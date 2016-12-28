EVENTS = require('gameEvents');

module.exports = {
    name: "station",
    spriteKey: "station",
    spriteSpec: require("../../assets/sprites/stations/marker1/spriteSpec"),
    onArrivalTriggers: [
        {
            key: EVENTS.SWITCH_STATE,
            payload: {
                newState: "shop"
            }
        }
    ]
}
