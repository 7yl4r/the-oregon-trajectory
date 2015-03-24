require('angular');

var app = angular.module('you-win', []);

app.directive("youWin", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/youWin/youWin.html"
    };
});

module.exports = angular.module('you-win').name;