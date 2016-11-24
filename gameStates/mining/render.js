module.exports = function() {
  // globalData.game.debug.spriteInfo(globalData.sprite, 32, 32);
  // globalData.game.debug.spriteInfo(globalData.asteroid, 32, 132);
  // globalData.game.debug.text('ship.velocity: ' + globalData.sprite.body.velocity, 32, 250);
  // globalData.game.debug.text('aster.velocity: ' + globalData.asteroid.body.velocity, 32, 300);
  // globalData.game.debug.body(globalData.sprite);
  // globalData.game.debug.body(globalData.asteroid);
  // globalData.bullets.forEachExists(globalData.game.debug.body, globalData.game.debug);
  // globalData.game.debug.body(globalData.asteroid);
  // globalData.parts.forEachExists(globalData.game.debug.body, globalData.game.debug);

  globalData.game.debug.text('fuel: ' + globalData.calcFuel(), 32, 32);
  globalData.game.debug.text('credits: ' + globalData.calcCredits(), 32, 96);
}
