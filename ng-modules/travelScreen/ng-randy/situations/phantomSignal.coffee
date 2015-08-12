

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
                    return "oldShip"
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
                    gameData.scope.$broadcast('switchToModule', 'travel-screen')
            }
        ]
    },
    wonder: {
        story: "You decide to continue on your way without investigating the signal, but you always wonder what was out there.",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.scope.$broadcast('switchToModule', 'travel-screen')
            }
        ]
    }
}