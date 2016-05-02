require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers
typeWriter = require('typeWriter');

var app = angular.module('welcome', []);

app.directive("welcome", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/welcome/welcome.html"
    };
});

app.controller("welcomeController", ['data', '$scope', '$rootScope', 'music', function(data, $scope, $rootScope, music) {
    var vm = this;

    // NOTE: onEntry function will not trigger for welcome screen, b/c it is first to activate
    vm.nodule = new Nodule($rootScope, 'welcome');

    // start the typewriter immediately (usually this is done in onEntry)
    var text = $('#welcome-typewriter').data('text');
    typeWriter(text, 0, '#welcome-typewriter');

    vm.clickedTheButton = function(){
        $scope.$emit('switchToModule', 'main-menu');
    }
}]);

module.exports = angular.module('welcome').name;
