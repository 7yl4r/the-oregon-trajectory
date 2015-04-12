module.exports = {
  initial:{
    story: " You and your crew are observing a unique phenomena in space when you receive a space weather report warning of an impending proton storm caused by solar winds. Proton storms can bombard humans with damaging radiation, can destroy solar collector efficiency and damage sensitive equipment. <br><br> Luckily your spacecraft is equipped with a shielded pod that will protect you from the storm – but your crew isn’t the only thing you have to worry about! Energized protons can damage electronic components, cause software contamination and can even result in unexpected (sometimes called “phantom”) spacecraft commands to be executed. <br><br> It’s probably a smart idea to turn shield your equipment as best you can and enter the pod until after the storm passes in a few hours, but your chief science officer believes that this may be the only opportunity to observe this special event.",
    question: "What do you do?",
    choices: [
      {
        name: "Shield your equipment and head for the pod, you can always try again later.",
        next:"abandonthread"
      },{
        name: "Ignore the signal and continue on your current path",
        next:"wonder"
      }
    ]
  },
  abandonthread: {
    story: " The solar storm lasted for only an hour, and all of your crew emerges from the shielded pod ready to resume your observations. Your equipment suffered no damage and you’re able to capture some much-needed data!",
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
    story: " The proton storm lasted many hours, and when you and your crew emerge from the pod you find a good deal of your equipment malfunctioning, worse yet any data you captured was lost during the storm. Better luck next time!",
    choices: [
      {
        name: "continue",
        next: (gameData)->
          gameData.scope.$broadcast('switchToModule', 'travel-screen')
      }
    ]
  }
}
