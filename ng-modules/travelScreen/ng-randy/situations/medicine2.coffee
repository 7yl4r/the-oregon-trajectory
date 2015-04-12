module.exports = {
  initial:{
    story: " As you continue towards your next destination you’re contacted by a small corporate vessel doing research into the effects of long term spaceflight on mental health, and they’d like to examine your crew! <br><br> The research team offers fuel, food and credits in return for participating in the study, and will share any results with you once the study is finished.",
    question: "What do you do?",
    choices: [
      {
        name: "Participate in the study",
        next:"oldShip"
      },{
        name: "We don’t have time to participate in a study, the mission is more important.",
        next:"wonder"
      }
    ]
  },
  oldShip: {
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
    story: " You decided not to participate in the study. You leave the ship behind you, knowing that there will be many other volunteers following in your footsteps in the coming months.",
    choices: [
      {
        name: "continue",
        next: (gameData)->
          gameData.scope.$broadcast('switchToModule', 'travel-screen')
      }
    ]
  }
}