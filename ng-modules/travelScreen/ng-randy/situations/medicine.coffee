
module.exports = {
    initial:{
        story: " As you speed along towards your next destination you come across a science ship investigating the effects of long term spaceflight on human health, and they’d like to examine your crew! <br><br> After almost a century of humans traveling in space (it is the 2050s, anyway!), the ill-effects of space travel on human health have been well documented. Many of the technological advances that we enjoy in medicine came out of the space program (lightweight wheelchairs, CAT and MRI scans, implantable pacemakers, and radiation therapy, to name a few! <br><br> The research collected by this team could help future colonists and even people back home on Earth – but it will cost x fuel and x food to participate in the study.",
        question: "What do you do?",
        choices: [
            {
                name: "We should do what we can to help, right?",
                next: (gameData)->
                    chance = Math.random()
                    if chance > .5
                        return "encounter"
                    else
                        return "encounter2"
            },{
                name: "We don’t have time to participate in a study, the mission is more important.",
                next:"wonder"
            }
        ]
    },
    encounter: {
        story: " The team from the other ship studies your crew and gains new insight into the effects of long term spaceflight on human health. They give you 300 fuel and 400 food as a reward for helping them further their knowledge.",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.fuel += 300
                    gameData.food += 400
                    gameData.scope.$broadcast('switchToModule', 'travel-screen')
            }
        ]
    },
    encounter2: {
        story: " The team from the other ship comes aboard and studies your crew’s behavior and health for a short period of time – and make surprising discoveries unrelated to mental health! Instead, they discover a new way to combat blindness, one of the most common health issues related to space travel. <br><br> In addition, you receive 430 fuel and 400 food for participating in the study!",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.fuel += 430
                    gameData.food += 400
                    gameData.scope.$broadcast('switchToModule', 'travel-screen')
            }
        ]
    },
    wonder: {
        story: " You decided not to participate in the study. You leave the science team behind you, knowing that there will be many other volunteers following in your footsteps in the coming months.",
        choices: [
            {
                name: "continue",
                next: (gameData)->
                    gameData.scope.$broadcast('switchToModule', 'travel-screen')
            }
        ]
    }
}