require('angular');
require('howler');
Nodule = require('nodule');

var app = angular.module('main-menu', []);

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

    vm.onEntry = function() {
        $scope.$emit('changeMusicTo', vm.music);
    }

    vm.nodule = new Nodule($rootScope, 'main-menu', vm.onEntry)

    vm.startGame = function(){
        data.reset();
        $scope.$emit('switchToModule', 'shop');
    }
}]);

module.exports = angular.module('main-menu').name;