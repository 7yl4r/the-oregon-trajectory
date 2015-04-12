require('angular');
Nodule = require('nodule');  // for nodule helpers

// init the angular app
var app = angular.module('example-module', []);

// set up the "directive" to connect html view to this
app.directive("exampleModule", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/exampleModule/exampleModule.html"
    };
});

// set up the actual controller
app.controller("exampleController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope) {
    // use vm (short for "virtual model") to keep a reference
    var vm = this;
    vm.exampleProperty = "before entry";

    vm.onEnter = function(){
        // runs when the module is brought into player view
        vm.exampleProperty = "after entry";
    }

    // nodule helps attach init. and teardown functions to events (and a few other things)
    vm.nodule = new Nodule($rootScope, 'example-module', vm.onEntry);

    vm.buttonClick = function(){
        // this function is triggered by the button
        vm.exampleProperty = "after click"
    }
}]);

// this is needed to connect with the main app.
module.exports = angular.module('example-module').name;