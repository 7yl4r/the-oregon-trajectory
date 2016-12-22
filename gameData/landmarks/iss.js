module.exports = {
    name: "International Space Station",
    spriteKey: "iss",
    spriteSpec: require("../../assets/sprites/stations/iss/spriteSpec"),
    onArrivalTriggers: [
        {
            key: "switch-state",
            payload: {
                newState: "shop"
            }
        }
    ]
}
