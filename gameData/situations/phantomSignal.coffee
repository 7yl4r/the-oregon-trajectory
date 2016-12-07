

module.exports = {
    initial:{
        story: "As you speed towards your next destination, your radio picks up a faint rhythmic clicking. <br><br> Your radio could just be picking up low level cosmic background radiation, but there’s a small chance that the signal could be coming from another ship or a cache of supplies.",
        question: "do you:",
        choices: [
            {
                name: "Investigate the signal",
                next:"transit"
            },{
                name: "Ignore the signal and continue on your current path",
                next:"wonder"
            }
        ]
    },
    transit: {
        story: "You expend 50 fuel adjusting your course to pass nearer to the signal",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.fuel -= 50
                    chance = Math.random()
                    if chance < .2
                        return "oldShip"
                    else if chance < .4
                        return "oldship2"
                    else
                        return "nothing"
            }
        ]
    }
    nothing: {
        story: "As you grow closer your instruments resolve the anomaly; looks like it was just background radiation after all.",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    console.log('TODO: return to travel-screen')
                    $(document).trigger('switchToModule', 'travel-screen')
            }
        ]
    }
    oldShip: {
        story: "You found a ship, but it appears to have been abandoned long ago. You salvage some scrap, 300 fuel and 200 food",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.fuel += 300
                    gameData.food += 200
                    console.log('TODO: return to travel-screen')
                    $(document).trigger('switchToModule', 'travel-screen')
            }
        ]
    },
    oldShip2: {
        story: "It wasn’t background radiation at all – it’s a small ship! They’ve been trying to signal for help for almost a week. They give you all 500 of their food and 1000 fuel in exchange for a ride to the next station.",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.fuel += 500
                    gameData.food += 1000
                    console.log('TODO: return to travel-screen')
                    $(document).trigger('switchToModule', 'travel-screen')
            }
        ]
    },
    wonder: {
        story: "You decide to continue on your way without investigating the signal, but you always wonder what was out there.",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    console.log('TODO: return to travel-screen')
                    $(document).trigger('switchToModule', 'travel-screen')
            }
        ]
    }
}
