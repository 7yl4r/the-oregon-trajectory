
module.exports = {
  initial:{
    story: "Your ship has taken a beating during the course of your journey, and your crew has decided to do some quick repairs that should hold until you get to your next destination. While the repair team does its work, the rest of the crew takes some much needed time to rest, relax and share memories of home none of you may never see again. *pop* *pop* *ping* <br><br> At first everyone inside the ship panics, worrying that the hull has begun to buckle – but you breathe a sigh of relief when you realize it’s just a tether coming loose… Wait. <br><br> A safety tether? Like the one the crew uses to stay attached to the ship outside during repairs! <br><br> Astronauts have a SAFER (Simplified Aid for EVA Rescue) device built into their suits to help them stay close to the ship if a tether breaks, but you'll have to be very careful about how you proceed to recapture your free-floating crew.",
    question: "What do you do?",
    choices: [
      {
        name: "You can’t put a cost on human lives, we’ll do anything to save our crew!",
        next: "saveCrew"
      },{
        name: "It’s too risky, we have to put the safety of the mission first. They’ll have to try and get back to the ship on their own.",
        next:"sadTimes"
      }
    ]
  },
  saveCrew: {
    story: "You successfully rescued all of your crew, but you lost 50 fuel and 100 food in the process.",
    choices: [
      {
        name: "continue",
        next: (gameData)->
            gameData.fuel -= 50
            gameData.food -= 100
                    console.log('TODO: return to travel-screen')
                    $(document).trigger('switchToModule', 'travel-screen')
      }
    ]
  },
  sadTimes: {
    story: "Your stranded crew members were unable to get back to the ship in time, and have sunk into the inky blackness of space. The crew mourns this terrible loss, and you quietly resume your journey. You always ask yourself if you could have done something differently."
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
