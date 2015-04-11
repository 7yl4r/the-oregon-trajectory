require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers

var app = angular.module('asteroid-mining', []);

app.directive("asteroidMining", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/asteroidMining/asteroidMining.html"
    };
});

app.controller("asteroidMiningController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope) {
    var vm = this;
    vm.nodule = new Nodule($rootScope, 'asteroid-mining');

    // your controller code here
    vm.clickedTheButton = function(){
        alert('you clicked asteroid-mining button')
    }
}]);

module.exports = angular.module('asteroid-mining').name;