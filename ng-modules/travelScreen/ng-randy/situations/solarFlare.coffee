
module.exports = {
  initial:{
    story: " You and your crew are running an important experiment that will take another 5 hours to complete, but you’ve received a space weather report warning of an impending proton storm. Proton storms, also known as “solar particle events”, happen when particles emitted by the sun during coronal mass ejects and solar flares are pushed out into space. <br><br>Luckily your spacecraft is equipped with a shielded pod that will protect you from the storm – but your crew isn’t the only thing you have to worry about! Energized protons can damage electronic components, cause software contamination and can even result in unexpected (sometimes called “phantom”) spacecraft commands to be executed. <br><br> It’s probably a smart idea to turn off your equipment and stop your experiment until after the storm passes in a few hours, but your chief science officer believes that you’re on the edge of a breakthrough.",
    question: "What do you do?",
    choices: [
      {
        name: "Stop the experiment, you can always try again later.",
        next:"stopexperiment"
      },{
        name: " This experiment is too important to stop! We’ll just have to hope the rewards outweigh the risk…",
        next:"wonder"
      }
    ]
  },
  stopexperiment: {
    story: " You and your crew emerge from the shielded pod safe and sound. You try to rerun your experiment, but fail because you only had enough materials to run the experiment once, and have to chalk this one up to experience. Better luck next time!",
    choices: [
      {
        name: "continue",
        next: (gameData)->
          gameData.fuel += 5
          gameData.food += 5
          gameData.scope.$broadcast('switchToModule', 'travel-screen')
      }
    ]
  },
  wonder: {
    story: " You and your crew emerge from the shielded pod many hours later, long after your experiment should have been finished. Amazingly enough you didn’t lose any data and your equipment is undamaged – and you’ve made an amazing new discovery about proton storms, too!",
    choices: [
      {
        name: "continue",
        next: (gameData)->
          gameData.fuel += 400
          gameData.food += 200
          gameData.scope.$broadcast('switchToModule', 'travel-screen')
      }
    ]
  }
}