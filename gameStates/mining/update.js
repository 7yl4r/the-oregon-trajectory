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

partCatch = function() {
  // catch the asteroid chunk
  globalData.game.sound.play('clunk');
  var rnd = globalData.game.rnd.integerInRange.bind(globalData.game.rnd);
  globalData.stats.parts++;
  globalData.stats.fuel += rnd(globalData.game.miningFuelPerPartMin,
                                globalData.game.miningFuelPerPartMax);
  globalData.stats.credits += rnd(globalData.game.miningCreditsPerPartMin,
                                    globalData.game.miningCreditsPerPartMax);
}

screenKill = function(sprite) {
    var wrap = false;

    if (sprite.x < 0) {
        sprite.x = globalData.game.width;
        wrap = true;
    } else if (sprite.x > globalData.game.width) {
        sprite.x = 0;
        wrap = true;
    }

    if (sprite.y < 0) {
        sprite.y = globalData.game.height;
        wrap = true;
    } else if (sprite.y > globalData.game.height) {
        sprite.y = 0;
        wrap = true;
    }
    if (wrap) sprite.kill();
    return wrap;
}

fireBullet = function() {
    if (globalData.game.time.now > globalData.bulletTime)
    {
        var bullet = globalData.bullets.getFirstExists(false);

        if (bullet)
        {
            if (Math.random() > 0.5) {
                globalData.game.sound.play('shot1');
            } else {
                globalData.game.sound.play('shot2');
            }
            var pos = globalData.sprite.toGlobal(globalData.sprite.anchor);
            bullet.reset(pos.x, pos.y);
            bullet.lifespan = 2000;
            bullet.rotation = globalData.sprite.rotation;
            globalData.game.physics.arcade.velocityFromRotation(globalData.sprite.rotation, 400, bullet.body.velocity);
            globalData.bulletTime = globalData.game.time.now + 250;
            globalData.stats.bullets++;
        }
    }
}

exitModule = function(reason){
    if(typeof globalData.engineSound != 'undefined' ||
        globalData.engineSound.isPlaying) {
      globalData.engineSound.stop();
    }

    if (globalData.game) {
      globalData.game.fuel = globalData.calcFuel();
      globalData.game.money = globalData.calcCredits()
    }

    // var dialog = require('mining-dialog-finish');
    // var r = "state_"+reason;
    // var d = dialog(globalData.stats, function(){
    //   console.log('end mining');
    // });
    console.log('end mining')
    globalData.game.state.start('boot')
}

module.exports = function() {  // update function
  if (globalData.game.inMenu){  // check for menu pause
      globalData.game.physics.arcade.isPaused = true;
  } else {
      if (globalData.game.physics.arcade.isPaused){
          globalData.game.physics.arcade.isPaused = false;
      }
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
          fireBullet();
      }

      if (screenKill(globalData.sprite)) {
          // alert('You broke out of orbit!');
          exitModule('exit');
      }

      // globalData.bullets.forEachExists(screenKill, this);

      globalData.parts.forEachExists(screenKill, this);

      (function (item) {
          item.angle += item.rotateAngle;
          if (screenKill(item)) {
              exitModule('end');
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
              exitModule('depleted');
          }

          bullet.kill();
      });

      globalData.game.physics.arcade.overlap(globalData.parts, globalData.sprite, null, function (sprite, projectile) {
          if (!projectile.alive) return;

          partCatch(projectile);
          projectile.kill();
      });

      globalData.game.physics.arcade.overlap(globalData.asteroid, globalData.sprite, null, function (sprite, asteroid) {
          globalData.stats.crash = true;
          globalData.stats.credits = 0;
          globalData.stats.fuel = 0;
        //   sounds.bummer.play();
          exitModule('crash');
      });
  }
}
