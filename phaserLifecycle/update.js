fireEngines = function() {
    globalData.lastEngineFire = new Date().getTime();
    if (typeof globalData.engineSound == 'undefined' ||
        !globalData.engineSound.isPlaying){
        globalData.engineSound = globalData.game.sound.play('propel');
    }
}

shutdownEngines = function(){
    if (typeof globalData.engineSound != 'undefined'){
        if (new Date().getTime() - globalData.lastEngineFire > globalData.engineDelay
            && globalData.engineSound.isPlaying) {
            globalData.engineSound.stop();
        }
    }
}

module.exports = function() {  // update function
  if (globalData.cursors.up.isDown) {
      // accelerate forward
      fireEngines();
      globalData.game.physics.arcade.accelerationFromRotation(globalData.sprite.rotation, 200, globalData.sprite.body.acceleration);
      globalData.stats.main_fuel++;
  } else {
      shutdownEngines();
      globalData.sprite.body.acceleration.set(0);
  }

  if (globalData.cursors.left.isDown) {
      // rotate
      fireEngines();
      globalData.sprite.body.angularVelocity = -100;
      globalData.stats.secondary_fuel++;
  } else if (globalData.cursors.right.isDown) {
      // rotate
      fireEngines();
      globalData.sprite.body.angularVelocity = 100;
      globalData.stats.secondary_fuel++;
  } else {
      shutdownEngines();
      globalData.sprite.body.angularVelocity = 0;
  }

  if (globalData.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      globalData.fireBullet();
  }

  if (globalData.screenKill(globalData.sprite)) {
      // alert('You broke out of orbit!');
      globalData.exitModule('exit');
  }

  // globalData.bullets.forEachExists(globalData.screenKill, this);

  globalData.parts.forEachExists(globalData.screenKill, this);

  (function (item) {
      item.angle += item.rotateAngle;
      if (globalData.screenKill(item)) {
          globalData.exitModule('end');
      }
  })(globalData.asteroid);

  globalData.game.physics.arcade.overlap(globalData.bullets, globalData.asteroids, null, function (bullet, asteroid) {
      if (!bullet.alive || !asteroid.alive) return;
      bullet.kill();
      asteroid.kill();
  });

  // hit the asteroid & break off a piece
  globalData.game.physics.arcade.overlap(globalData.bullets, globalData.asteroid, null, function (asteroid, bullet) {
      if (!bullet.alive) return;

      var projectile = globalData.parts.getFirstExists(false);
      if (projectile) {
          projectile.reset(bullet.x, bullet.y);
          projectile.rotation = Phaser.Math.reverseAngle(bullet.rotation)
            + asteroid.rotateAngle
            + globalData.game.rnd.realInRange(-Math.PI/4, Math.PI/4);
          globalData.game.physics.arcade.velocityFromRotation(projectile.rotation, 200, projectile.body.velocity);
      }
      globalData.asteroidSize -= globalData.ASTEROID_SHRINK;
      globalData.asteroid.scale.set(globalData.asteroidSize, globalData.asteroidSize);
      if (globalData.asteroidSize <= 0){
          globalData.exitModule('depleted');
      }

      bullet.kill();
  });

  globalData.game.physics.arcade.overlap(globalData.parts, globalData.sprite, null, function (sprite, projectile) {
      if (!projectile.alive) return;

      globalData.partCatch(projectile);
      projectile.kill();
  });

  globalData.game.physics.arcade.overlap(globalData.asteroid, globalData.sprite, null, function (sprite, asteroid) {
      globalData.stats.crash = true;
      globalData.stats.credits = 0;
      globalData.stats.fuel = 0;
      sounds.bummer.play();
      globalData.exitModule('crash');
  });
}
