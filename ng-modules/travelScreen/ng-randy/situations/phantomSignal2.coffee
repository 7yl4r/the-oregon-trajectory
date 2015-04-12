
module.exports = {
  initial:{
    story: " As you speed towards your next destination, your radio picks up a faint rhythmic clicking. <br><br> Your radio could just be picking up low level cosmic background radiation, but there’s a small chance that the signal could be coming from another ship or a cache of supplies.",
    question: "What do you do?",
    choices: [
      {
        name: "Investigate the signal",
        next:"oldShip"
      },{
        name: "Ignore the signal and continue on your current path",
        next:"wonder"
      }
    ]
  },
  oldShip: {
    story: "It wasn’t background radiation at all – it’s a small ship! They’ve been trying to signal for help for almost a week. They give you all 500 of their food and 1000 fuel in exchange for a ride to the next station.",
    choices: [
      {
        name: "continue",
        next: (gameData)->
          gameData.fuel += 500
          gameData.food += 1000
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