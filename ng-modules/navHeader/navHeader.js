require('angular');


var app = angular.module('header-navbar', [
    require('game')
]);

app.directive("navHeader", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/navHeader/navHeader.html"
    };
});

app.controller("headerController", ['$http', 'data', function($http, data) {
    var vm = this;
    vm.version = '0.0.0';
    $http.get(data.gameDir+'/package.json').success(function(data, status, headers, config){
        vm.version = data.version;
    });
}]);

module.exports = angular.module('header-navbar').name;