require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers

var app = angular.module('asteroid-mining', []);

app.directive("asteroidMining", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/asteroidMining/asteroidMining.html"
    };
});

app.controller("asteroidMiningController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope) {
    var vm = this;
    vm.nodule = new Nodule($rootScope, 'asteroid-mining', function(){
      vm.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'asteroid-mining-content', {
        preload: vm.preload,
        create: vm.create,
        update: vm.update,
        render: vm.render
      });
    });

    vm.bulletTime = 0;

    vm.preload = function() {

      vm.game.load.image('a1', 'http://examples.phaser.io/assets/games/asteroids/asteroid1.jpg');
      vm.game.load.image('a2', 'http://examples.phaser.io/assets/games/asteroids/asteroid2.jpg');
      vm.game.load.image('a3', 'http://examples.phaser.io/assets/games/asteroids/asteroid3.jpg');
      vm.game.load.image('space', 'http://examples.phaser.io/assets/skies/deep-space.jpg');
      vm.game.load.image('bullet', 'http://examples.phaser.io/assets/games/asteroids/bullets.png');
      vm.game.load.image('ship', 'http://examples.phaser.io/assets/games/asteroids/ship.png');

    }

    vm.create = function() {
      //  This will run in Canvas mode, so let's gain a little speed and display
      vm.game.renderer.clearBeforeRender = true;
      vm.game.renderer.roundPixels = true;

      //  We need arcade physics
      vm.game.physics.startSystem(Phaser.Physics.ARCADE);

      //  A spacey background
      vm.game.add.tileSprite(0, 0, vm.game.width, vm.game.height, 'space');

      //  Our ships bullets
      vm.bullets = vm.game.add.group();
      vm.bullets.enableBody = true;
      vm.bullets.physicsBodyType = Phaser.Physics.ARCADE;

      //  All 40 of them
      vm.bullets.createMultiple(40, 'bullet');
      vm.bullets.setAll('anchor.x', 0.5);
      vm.bullets.setAll('anchor.y', 0.5);

      //  Our player ship
      vm.sprite = vm.game.add.sprite(300, 300, 'ship');
      vm.sprite.anchor.set(0.5);

      //  and its physics settings
      vm.game.physics.enable(vm.sprite, Phaser.Physics.ARCADE);

      vm.sprite.body.drag.set(0);
      vm.sprite.body.maxVelocity.set(200);


      // asteroids
      vm.asteroids = vm.game.add.group();
      vm.asteroids.enableBody = true;
      vm.asteroids.physicsBodyType = Phaser.Physics.ARCADE;


      vm.asteroids.createMultiple(3, 'a1');
      vm.asteroids.createMultiple(3, 'a2');
      vm.asteroids.createMultiple(3, 'a3');
      vm.createAsteroids();

      //  Game input
      vm.cursors = vm.game.input.keyboard.createCursorKeys();
      vm.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    }

    vm.update = function() {
      if (vm.cursors.up.isDown)
      {
          vm.game.physics.arcade.accelerationFromRotation(vm.sprite.rotation, 200, vm.sprite.body.acceleration);
      }
      else
      {
          vm.sprite.body.acceleration.set(0);
      }

      if (vm.cursors.left.isDown)
      {
          vm.sprite.body.angularVelocity = -300;
      }
      else if (vm.cursors.right.isDown)
      {
          vm.sprite.body.angularVelocity = 300;
      }
      else
      {
          vm.sprite.body.angularVelocity = 0;
      }

      if (vm.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      {
          vm.fireBullet();
      }

      vm.screenWrap(vm.sprite);

      vm.bullets.forEachExists(vm.screenWrap, this);

      vm.asteroids.forEachExists(function (item) {
              item.x += item.moveX;
              item.y += item.moveY;
              item.angle += item.rotateAngle;
              vm.screenWrap(item);
          });

      vm.game.physics.arcade.overlap(vm.bullets, vm.asteroids, null, function(bullet, asteroid){
          if (!bullet.alive || !asteroid.alive) return;
          bullet.kill();
          asteroid.kill();
      });
    }

    vm.createAsteroids = function() {
        for (var enemyIndex = 0; enemyIndex < 9; enemyIndex++) {
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

            var enemy = vm.asteroids.create(x, y, "a" + vm.game.rnd.integerInRange(1, 3));
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
                bullet.reset(vm.sprite.body.x + 16, vm.sprite.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = vm.sprite.rotation;
                vm.game.physics.arcade.velocityFromRotation(vm.sprite.rotation, 400, bullet.body.velocity);
                bulletTime = vm.game.time.now + 50;
            }
        }

    }

    vm.screenWrap = function(sprite) {

        if (sprite.x < 0)
        {
            sprite.x = vm.game.width;
        }
        else if (sprite.x > vm.game.width)
        {
            sprite.x = 0;
        }

        if (sprite.y < 0)
        {
            sprite.y = vm.game.height;
        }
        else if (sprite.y > vm.game.height)
        {
            sprite.y = 0;
        }

    }

    vm.render = function() {

    }
}]);

module.exports = angular.module('asteroid-mining').name;
