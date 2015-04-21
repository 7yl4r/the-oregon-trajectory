module.exports = function (stats, startCb, continueCb) {
  return {
    initial: {
      story: "You are nearing an asteroid. You can rendezvous with the asteroid and attempt to break off and collect pieces of regolith for reprocessing, or continue on your current trajectory.",
      question: "What do you want to do?",
      choices: [
        {name: "Mine for resources", next:startCb},
        {name: "Pass by", next:continueCb}
      ]
    }
  }
}
