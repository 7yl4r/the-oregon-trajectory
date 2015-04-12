require('angular');
Nodule = require('nodule');
Howl = require('howler');

var app = angular.module('game-over', []);

app.directive("gameOver", function() {
  return {
    restrict: 'E',
    templateUrl: "ng-modules/gameOver/gameOver.html"
  };
});

app.controller("youWinCtrl", [ '$rootScope', '$scope', function($rootScope, $scope){
  vm = this;
  vm.music =  new Howl({
    urls: ['assets/sound/music/winning/winning.ogg', 'assets/sound/music/winning/winning.mp3'],
    loop: true
  });
  clickSound = new Howl({
    urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
  })

  vm.onEnter = function(){
    $scope.$emit('changeMusicTo', vm.music);
  }
  vm.nodule = Nodule($rootScope, 'you-win', vm.onEnter);

  vm.mainMenu = function(){
    clickSound.play();
    $scope.$emit('switchToModule', 'main-menu');
  }
}]);



app.controller("gameOverCtrl", [ '$rootScope', '$scope', function($rootScope, $scope){
  vm = this;
  vm.music =  new Howl({
    urls: ['assets/sound/music/Losing.ogg', 'assets/sound/music/Losing.mp3'],
    loop: true
  });
  clickSound = new Howl({
    urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
  })

  vm.onEnter = function(){
    $scope.$emit('changeMusicTo', vm.music);
  }
  vm.nodule = Nodule($rootScope, 'game-over', vm.onEnter);

  vm.mainMenu = function(){
    clickSound.play();
    $scope.$emit('switchToModule', 'main-menu');
  }
}]);

module.exports = angular.module('game-over').name;
