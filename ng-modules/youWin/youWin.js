require('angular');

var app = angular.module('you-win', []);

app.directive("youWin", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/youWin/youWin.html"
    };
});

module.exports = angular.module('you-win').name;