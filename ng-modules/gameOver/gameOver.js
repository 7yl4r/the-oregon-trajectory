require('angular');
Nodule = require('nodule');

var app = angular.module('game-over', [
    require('game')
]);

app.directive("gameOver", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/gameOver/gameOver.html"
    };
});

app.controller("gameOverCtrl", [ '$rootScope', '$scope', 'data', 'sounds', 'music', function($rootScope, $scope, data, sounds, music){
    vm = this;
    vm.data = data;

    vm.onEnter = function(){
        $scope.$emit('changeMusicTo', music.losing);
    }
    vm.nodule = Nodule($rootScope, 'game-over', vm.onEnter);

    vm.mainMenu = function(){
        sounds.click.play();
        $scope.$emit('switchToModule', 'main-menu');
    }
}]);

module.exports = angular.module('game-over').name;
