require('angular');

var app = angular.module('game-over', []);

app.directive("gameOver", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/gameOver/gameOver.html"
    };
});

module.exports = angular.module('game-over').name;