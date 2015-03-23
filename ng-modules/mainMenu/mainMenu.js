require('angular');

var app = angular.module('main-menu', []);

app.directive("mainMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/mainMenu/mainMenu.html"
    };
});

module.exports = angular.module('main-menu').name;