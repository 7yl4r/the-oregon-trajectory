module.exports = {
    name: "station",
    spriteKey: "station",
    spriteSpec: require("../../assets/sprites/stations/marker1/spriteSpec"),
    onArrivalTriggers: [
        {
            key: "switch-state",
            payload: {
                newState: "shop"
            }
        }
    ]
}
