require('angular')

app = angular.module('app-footer', [])

app.directive("appFooter", () ->
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/appFooter/appFooter.html"
    }
)

module.exports = angular.module('app-footer').name