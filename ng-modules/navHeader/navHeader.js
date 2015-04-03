require('angular');


var app = angular.module('header-navbar', []);

app.directive("navHeader", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/navHeader/navHeader.html"
    };
});

module.exports = angular.module('header-navbar').name;