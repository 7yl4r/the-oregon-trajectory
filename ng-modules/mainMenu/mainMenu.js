require('angular');

var app = angular.module('main-menu', []);

app.directive("mainMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/mainMenu/mainMenu.html"
    };
});

module.exports = angular.module('main-menu').name;