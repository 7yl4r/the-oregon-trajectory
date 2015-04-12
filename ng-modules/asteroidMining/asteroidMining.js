require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers
Phaser = require('phaser');

var app = angular.module('asteroid-mining', []);

var baseUrl = location.host == '7yl4r.github.io' ? '/the-oregon-trajectory/' : '/';

app.directive("asteroidMining", function() {
    return {
        restrict: 'E',
        templateUrl: baseUrl+"ng-modules/asteroidMining/asteroidMining.html"
    };
});

app.directive("asteroidMiningGame", function() {
    return {
        restrict: 'E',
        templateUrl: baseUrl+"ng-modules/asteroidMining/asteroidMiningGame.html"
    };
});

app.controller("asteroidMiningController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope) {

    new Nodule($rootScope, 'asteroid-mining', function(){
        var dialog = require('mining-dialog-start');
        var d = dialog(vm.stats, function(){
          $scope.$emit('switchToModule', 'asteroid-mining-game');
        }, function(){
          $scope.$emit('switchToModule', 'travel-screen');
        });
        $scope.$emit('switchToModule', 'situation', d);
    });

}]);

app.controller("asteroidMiningGameController", ['data', '$scope', '$rootScope', '$filter', function(data, $scope, $rootScope, $filter) {

    var vm = this;
    vm.nodule = new Nodule($rootScope, 'asteroid-mining-game', function(){
      if (vm.game) {
        vm.game.destroy();
      }
      vm.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'asteroid-mining-content', {
        preload: vm.preload,
        create: vm.create,
        update: vm.update,
        render: vm.render
      });
    });

    vm.preload = function() {
      // vm.game.load.image('a1', 'assets/sprites/asteroids/0.png');
      // vm.game.load.image('a2', 'assets/sprites/asteroids/1.png');
      vm.game.load.image('a3', baseUrl+'assets/sprites/asteroids/p0.png');
      vm.game.load.image('a-small', baseUrl+'assets/sprites/asteroids/p0-small.png');
      vm.game.load.image('space', baseUrl+'assets/backgrounds/milky_way_bg.png');
      vm.game.load.image('bullet', 'http://examples.phaser.io/assets/games/asteroids/bullets.png');
      vm.game.load.image('ship', baseUrl+'assets/sprites/ship-nothrust.png');

    }

    vm.create = function() {
      vm.bulletTime = 0;
      vm.stats = {
        main_fuel: 0,
        secondary_fuel: 0,
        bullets: 0,
        parts: 0,
        crash: false,
        fuel: 0,
        credits: 0
      }

      var w=vm.game.width;
      var h=vm.game.height;
      var rnd=vm.game.rnd.integerInRange.bind(vm.game.rnd);

      //  This will run in Canvas mode, so let's gain a little speed and display
      vm.game.renderer.clearBeforeRender = false;
      vm.game.renderer.roundPixels = true;

      //  We need arcade physics
      vm.game.physics.startSystem(Phaser.Physics.ARCADE);

      //  A spacey background
      vm.game.add.tileSprite(0, 0, vm.game.width, vm.game.height, 'space');

      //  Our ships bullets
      vm.bullets = vm.game.add.group();
      vm.bullets.enableBody = true;
      vm.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      vm.bullets.createMultiple(40, 'bullet');
      vm.bullets.setAll('anchor.x', 0.5);
      vm.bullets.setAll('anchor.y', 0.5);

      // our asteroid particles
      vm.parts = vm.game.add.group();
      vm.parts.enableBody = true;
      vm.parts.physicsBodyType = Phaser.Physics.ARCADE;
      vm.parts.createMultiple(60, 'a-small');
      vm.parts.setAll('anchor.x', 0.5);
      vm.parts.setAll('anchor.y', 0.5);

      //  Our player ship
      vm.sprite = vm.game.add.sprite(
        rnd(w/10.0, w/3.0),
        rnd(h/10.0, h*9/10.0),
        'ship');
      vm.sprite.anchor.set(3.0/5.0, 0.5);
      vm.sprite.scale.set(0.25, 0.25);
      vm.game.physics.enable(vm.sprite, Phaser.Physics.ARCADE);
      vm.sprite.body.maxVelocity.set(200);
      vm.sprite.rotation = vm.game.physics.arcade.moveToXY(vm.sprite, w,
        rnd(h/10.0, h*9/10.00),
        rnd(w/60.0, w/90.0));

      // the asteroid
      vm.asteroid = vm.game.add.sprite(
        rnd(w*2/3.0, w*9/10.0),
        rnd(h/10.0, h*9/10.0),
        'a3');
      vm.asteroid.anchor.set(0.5, 0.5);
      vm.asteroid.scale.set(0.5, 0.5);
      vm.asteroid.rotateAngle = vm.game.rnd.realInRange(-2, 2);
      vm.game.physics.enable(vm.asteroid, Phaser.Physics.ARCADE);
      vm.game.physics.arcade.moveToXY(vm.asteroid, 0,
        rnd(h/10.0, h*9/10.00),
        rnd(w/60.0, w/90.0));

      // asteroids
      vm.asteroids = vm.game.add.group();
      // vm.asteroids.enableBody = true;
      // vm.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
      // vm.createAsteroids();

      //  Game input
      vm.cursors = vm.game.input.keyboard.createCursorKeys();
      vm.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    }

    vm.update = function() {
        if (vm.nodule.isActive) {
          if (vm.cursors.up.isDown) {
              vm.game.physics.arcade.accelerationFromRotation(vm.sprite.rotation, 200, vm.sprite.body.acceleration);
              vm.stats.main_fuel++;
          } else {
              vm.sprite.body.acceleration.set(0);
          }

          if (vm.cursors.left.isDown) {
              vm.sprite.body.angularVelocity = -100;
              vm.stats.secondary_fuel++;
          } else if (vm.cursors.right.isDown) {
              vm.sprite.body.angularVelocity = 100;
              vm.stats.secondary_fuel++;
          } else {
              vm.sprite.body.angularVelocity = 0;
          }

          if (vm.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
              vm.fireBullet();
          }

          if (vm.screenKill(vm.sprite)) {
              // alert('You broke out of orbit!');
              vm.exitModule('exit');
          }

          // vm.bullets.forEachExists(vm.screenKill, this);

          vm.parts.forEachExists(vm.screenKill, this);

          (function (item) {
              item.angle += item.rotateAngle;
              if (vm.screenKill(item)) {
                  vm.exitModule('end');
              }
          })(vm.asteroid);

          vm.game.physics.arcade.overlap(vm.bullets, vm.asteroids, null, function (bullet, asteroid) {
              if (!bullet.alive || !asteroid.alive) return;
              bullet.kill();
              asteroid.kill();
          });

          vm.game.physics.arcade.overlap(vm.bullets, vm.asteroid, null, function (asteroid, bullet) {
              if (!bullet.alive) return;

              var projectile = vm.parts.getFirstExists(false);
              if (projectile) {
                  projectile.reset(bullet.x, bullet.y);
                  projectile.rotation = Phaser.Math.reverseAngle(bullet.rotation)
                    + asteroid.rotateAngle
                    + vm.game.rnd.realInRange(-Math.PI/4, Math.PI/4);
                  vm.game.physics.arcade.velocityFromRotation(projectile.rotation, 200, projectile.body.velocity);
              }

              bullet.kill();
          });

          vm.game.physics.arcade.overlap(vm.parts, vm.sprite, null, function (sprite, projectile) {
              if (!projectile.alive) return;

              vm.partCatch(projectile);
              projectile.kill();
          });

          vm.game.physics.arcade.overlap(vm.asteroid, vm.sprite, null, function (sprite, asteroid) {
              vm.stats.crash = true;
              vm.stats.credits = 0;
              vm.stats.fuel = 0;
              vm.exitModule('crash');
          });
        }
    }

    vm.createAsteroids = function() {
        for (var enemyIndex = 0; enemyIndex < 5; enemyIndex++) {
            var indexEntry = vm.game.rnd.integerInRange(0, 3),
                x, y;
            switch (indexEntry) {
                case 0:
                {
                    x = vm.game.world.randomX;
                    y = 0;
                }
                    break;
                case 1:
                {
                    x = vm.game.width;
                    y = vm.game.world.randomY;
                }
                    break;
                case 2:
                {
                    x = vm.game.world.randomX;
                    y = vm.game.height;
                }
                    break;
                case 3:
                {
                    x = 0;
                    y = vm.game.world.randomY;
                }
                    break;
            }

            var enemy = vm.asteroids.create(x, y, "a3");
            enemy.scale = { x: 0.5, y: 0.5 };
            enemy.moveX = vm.game.rnd.integerInRange(-2, 2);
            while (enemy.moveX == 0) {
                enemy.moveX = vm.game.rnd.integerInRange(-2, 2);
            }
            enemy.moveY = vm.game.rnd.integerInRange(-2, 2);
            while (enemy.moveY == 0) {
                enemy.moveY = vm.game.rnd.integerInRange(-2, 2);
            }
            enemy.rotateAngle = vm.game.rnd.integerInRange(-2, 2);
            while (enemy.rotateAngle == 0) {
                enemy.rotateAngle = vm.game.rnd.integerInRange(-2, 2);
            }
            enemy.asteroidSize = 2;

            vm.asteroids.add(enemy);
            vm.game.physics.enable(enemy, Phaser.Physics.ARCADE);
        }

        vm.asteroids.setAll("anchor.x", 0.5);
        vm.asteroids.setAll("anchor.y", 0.5);
    }

    vm.fireBullet = function() {

        if (vm.game.time.now > vm.bulletTime)
        {
            var bullet = vm.bullets.getFirstExists(false);

            if (bullet)
            {
                var pos = vm.sprite.toGlobal(vm.sprite.anchor);
                bullet.reset(pos.x, pos.y);
                bullet.lifespan = 2000;
                bullet.rotation = vm.sprite.rotation;
                vm.game.physics.arcade.velocityFromRotation(vm.sprite.rotation, 400, bullet.body.velocity);
                vm.bulletTime = vm.game.time.now + 250;
                vm.stats.bullets++;
            }
        }
    }

    vm.screenKill = function(sprite) {
        var wrap = false;

        if (sprite.x < 0) {
            sprite.x = vm.game.width;
            wrap = true;
        } else if (sprite.x > vm.game.width) {
            sprite.x = 0;
            wrap = true;
        }

        if (sprite.y < 0) {
            sprite.y = vm.game.height;
            wrap = true;
        } else if (sprite.y > vm.game.height) {
            sprite.y = 0;
            wrap = true;
        }
        if (wrap) sprite.kill();
        return wrap;
    }

    vm.render = function() {
      // vm.game.debug.spriteInfo(vm.sprite, 32, 32);
      // vm.game.debug.spriteInfo(vm.asteroid, 32, 132);
      // vm.game.debug.text('ship.velocity: ' + vm.sprite.body.velocity, 32, 250);
      // vm.game.debug.text('aster.velocity: ' + vm.asteroid.body.velocity, 32, 300);
      // vm.game.debug.body(vm.sprite);
      // vm.game.debug.body(vm.asteroid);
      // vm.bullets.forEachExists(vm.game.debug.body, vm.game.debug);
      // vm.game.debug.body(vm.asteroid);
      // vm.parts.forEachExists(vm.game.debug.body, vm.game.debug);

      vm.game.debug.text('fuel: ' + $filter('number')(vm.calcFuel(), 2), 32, 32);
      vm.game.debug.text('credits: ' + vm.calcCredits(), 32, 96);
    }

    vm.calcFuel = function() {
      return game.fuel
        + vm.stats.fuel
        - vm.stats.main_fuel*game.miningFuelExpenseThrust
        - vm.stats.secondary_fuel*game.miningFuelExpenseRotate
        - vm.stats.bullets*game.miningFuelExpenseFiringBullet
    }

    vm.calcCredits = function() {
      return game.money
        + vm.stats.credits
    }

    vm.partCatch = function() {
      var rnd = vm.game.rnd.integerInRange.bind(vm.game.rnd);
      vm.stats.parts++;
      vm.stats.fuel += rnd(game.miningFuelPerPartMin, game.miningFuelPerPartMax);
      vm.stats.credits += rnd(game.miningCreditsPerPartMin, game.miningCreditsPerPartMax);
    }

    vm.exitModule = function(reason){
        if (vm.game) {
          game.fuel = vm.calcFuel();
          game.money = vm.calcCredits()
        }

        var dialog = require('mining-dialog-finish');
        var r = "state_"+reason;
        var d = dialog(vm.stats, function(){
          $scope.$emit('switchToModule', 'travel-screen');
        });
        $scope.$apply(function($scope) {
          $scope.$emit('switchToModule', 'situation', d, r);
        });
    }
}]);

module.exports = angular.module('asteroid-mining').name;
