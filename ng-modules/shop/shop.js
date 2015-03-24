require('angular');

var app = angular.module('shop', []);

app.directive("shop", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/shop/shop.html"
    };
});

module.exports = angular.module('shop').name;
