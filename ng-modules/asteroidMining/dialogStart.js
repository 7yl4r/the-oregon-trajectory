module.exports = function (stats, startCb, continueCb) {
  return {
    initial: {
      story: "You discovered an asteroid",
      question: "What do you want to do?",
      choices: [
        {name: "Mine for resources", next:startCb},
        {name: "Pass by", next:continueCb}
      ]
    }
  }
}
