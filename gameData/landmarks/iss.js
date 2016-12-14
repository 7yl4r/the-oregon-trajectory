module.exports = {
    name: "station",
    sprite: "./assets/sprites/station",
    onArrivalTriggers: [
        {
            key: "switch-state",
            payload: {
                newState: "shop"
            }
        }
    ]
}
