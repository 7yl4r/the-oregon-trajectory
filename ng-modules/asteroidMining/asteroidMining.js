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
      vm.game.renderer.clearBeforeRender = false;
      vm.game.renderer.roundPixels = true;

      //  We need arcade physics
      vm.game.physics.startSystem(Phaser.Physics.ARCADE);

      //  A spacey background
      vm.game.add.tileSprite(0, 0, game.width, game.height, 'space');
    }

    vm.update = function() {

    }

    vm.render = function() {

    }
}]);

module.exports = angular.module('asteroid-mining').name;
