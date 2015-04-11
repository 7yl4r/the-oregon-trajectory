require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers

var app = angular.module('situation', []);

app.directive("situation", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/situation/situation.html"
    };
});

app.controller("situationController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope) {
    var vm = this;
    vm.nodule = new Nodule($rootScope, 'situation');

    // your controller code here
    vm.clickedTheButton = function(){
        alert('you clicked situation button')
    }
}]);

module.exports = angular.module('situation').name;