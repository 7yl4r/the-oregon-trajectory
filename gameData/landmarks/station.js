module.exports = {
    name: "ISS",
    sprite: "./assets/sprites/iss",
    onArrivalTriggers: [
        {
            key: "switch-state",
            payload: {
                newState: "shop"
            }
        }
    ]
}
