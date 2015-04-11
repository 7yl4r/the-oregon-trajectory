require('angular');
require('howler');
Nodule = require('nodule');

var app = angular.module('main-menu', [
    require('game-btn')
]);

app.directive("mainMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/mainMenu/mainMenu.html"
    };
});

app.controller("mainMenuController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope){
    var vm = this;
    vm.music = new Howl({
        urls: ['assets/sound/music/theme/theme.mp3', 'assets/sound/music/theme/theme.ogg'],
        loop: true
    });
    clickSound = new Howl({
        urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
    });

    vm.onEntry = function() {
        $scope.$emit('changeMusicTo', vm.music);
    }

    vm.nodule = new Nodule($rootScope, 'main-menu', vm.onEntry)

    vm.startGame = function(){
        clickSound.play();
        data.reset();
        $scope.$emit('switchToModule', 'shop');
    }
}]);

module.exports = angular.module('main-menu').name;
