

module.exports = function (stats, callback) {
    var conclusion = "You are finishing with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel. Better luck next time!";
    var continueChoice = [
        {name: "Continue", next:callback}
    ]

    return {
    state_exit: {
      story: "You got too far from the asteroid and broke orbit. " + conclusion,
      choices: continueChoice
    },
    state_end: {
      story: "The asteroid got away. " + conclusion,
      choices: continueChoice
    },
    state_crash: {
      story: "You got too close to the asteroid and damaged your ship. " + conclusion,
      choices: continueChoice
    },
    state_depleted: {
      story: "This asteroid has been depleted of resources. " + conclusion,
       choices: continueChoice
    }
  }
}
