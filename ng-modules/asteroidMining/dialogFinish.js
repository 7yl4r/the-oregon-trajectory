module.exports = function (stats, callback) {
  return {
    state_exit: {
      story: "You broke out of orbit. You are finishing with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel.",
      choices: [
        {name: "Continue", next:callback}
      ]
    },
    state_end: {
      story: "The asteroid escaped. You are finishing with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel.",
      choices: [
        {name: "Continue", next:callback}
      ]
    },
    state_crash: {
      story: "You crashed with the asteroid. You are finishing with <strong>"+stats.credits+"</strong> credits and <strong>"+stats.fuel+"</strong> fuel.",
      choices: [
        {name: "Continue", next:callback}
      ]
    }
  }
}
