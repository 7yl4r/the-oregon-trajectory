require('angular');
Nodule = require('nodule');
Howl = require('howler');

var app = angular.module('game-over', [
    require('game')
]);

app.directive("gameOver", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/gameOver/gameOver.html"
    };
});

app.controller("gameOverCtrl", [ '$rootScope', '$scope', 'data', 'music', function($rootScope, $scope, data, music){
    vm = this;
    vm.data = data;
    clickSound = new Howl({
        urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
    })

    vm.onEnter = function(){
        $scope.$emit('changeMusicTo', music.losing);
    }
    vm.nodule = Nodule($rootScope, 'game-over', vm.onEnter);

    vm.mainMenu = function(){
        clickSound.play();
        $scope.$emit('switchToModule', 'main-menu');
    }
}]);

module.exports = angular.module('game-over').name;
