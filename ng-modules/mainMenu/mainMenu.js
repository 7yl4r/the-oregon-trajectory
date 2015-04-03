require('angular');
require('howler');

var app = angular.module('main-menu', []);

app.directive("mainMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/mainMenu/mainMenu.html"
    };
});

app.controller("mainMenuController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope){
    var vm = this;
    vm.active = false;
    vm.music = new Howl({
        urls: ['assets/sound/music/theme/theme.mp3', 'assets/sound/music/theme/theme.ogg'],
        loop: true
    });

    $rootScope.$on('switchToModule', function(event, nextModule){
        if (!vm.active) {
            if (nextModule == 'main-menu'){  // if switching to this module
                $scope.$emit('changeMusicTo', vm.music);
                vm.active = true;
            }
        } else {
            // switching from this module to another one
            vm.active = false;
        }
    });

    vm.startGame = function(){
        data.reset();
        $scope.$emit('switchToModule', 'shop');
    }
}]);

module.exports = angular.module('main-menu').name;