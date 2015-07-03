require('angular');
require('howler');

var app = angular.module('audio-controls', []);

app.directive("audioControls", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/audioControls/audioControls.html"
    };
});

app.controller("audioController", ['$rootScope', function($rootScope){
    var vm = this;
    vm.muted = false;

    vm.toggleMute = function(){
        if (vm.muted){
            Howler.unmute();
            vm.muted = false;
            $rootScope.$broadcast('unMute');
        } else {
            Howler.mute();
            vm.muted = true;
            $rootScope.$broadcast('mute');
        }
    }
}]);

module.exports = angular.module('audio-controls').name;