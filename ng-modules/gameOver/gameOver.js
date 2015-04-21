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


app.controller("gameOverCtrl", [ '$rootScope', '$scope', 'data', function($rootScope, $scope, data){
  vm = this;
  vm.data = data;
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
