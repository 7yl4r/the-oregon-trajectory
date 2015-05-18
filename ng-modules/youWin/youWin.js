require('angular');
Nodule = require('nodule');
Howl = require('howler');

var app = angular.module('you-win', [
    require('game')
]);

app.directive("youWin", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/youWin/youWin.html"
    };
});

app.controller("youWinCtrl", [ '$rootScope', '$scope', 'music', function($rootScope, $scope, music){
    vm = this;
    clickSound = new Howl({
        urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
    })

    vm.onEnter = function(){
        $scope.$emit('changeMusicTo', music.winning);
    }
    vm.nodule = Nodule($rootScope, 'you-win', vm.onEnter);

    vm.mainMenu = function(){
        clickSound.play();
        $scope.$emit('switchToModule', 'main-menu');
    }
}]);

module.exports = angular.module('you-win').name;
