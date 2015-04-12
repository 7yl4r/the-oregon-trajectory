module.exports = function (stats, callback) {
  return {
    state_exit: {
      story: "You got too far from the asteroid and broke orbit. You finish with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel. Better luck next time!",
      choices: [
        {name: "Continue", next:callback}
      ]
    },
    state_end: {
      story: "The asteroid got away. You are finishing with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel. Better luck next time!",
      choices: [
        {name: "Continue", next:callback}
      ]
    },
    state_crash: {
      story: "You got too close to the asteroid and damaged your ship. You are finishing with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel. Better luck next time!",      
      choices: [
        {name: "Continue", next:callback}
      ]
    }
  }
}
