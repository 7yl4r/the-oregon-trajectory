require('angular');
Nodule = require('nodule');

var app = angular.module('you-win', [
    require('game')
]);

app.directive("youWin", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/youWin/youWin.html"
    };
});

app.controller("youWinCtrl", [ '$rootScope', '$scope', 'music', 'sounds', function($rootScope, $scope, music, sounds){
    vm = this;

    vm.onEnter = function(){
        $scope.$emit('changeMusicTo', music.winning);
    }
    vm.nodule = Nodule($rootScope, 'you-win', vm.onEnter);

    vm.mainMenu = function(){
        sounds.click.play();
        $scope.$emit('switchToModule', 'main-menu');
    }
}]);

module.exports = angular.module('you-win').name;
