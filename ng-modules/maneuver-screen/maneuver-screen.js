require('angular');

var app = angular.module('maneuver-screen', []);

app.directive("maneuver-screen", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/maneuver-screen/maneuver-screen.html"
    };
});

module.exports = angular.module('maneuver-screen').name;