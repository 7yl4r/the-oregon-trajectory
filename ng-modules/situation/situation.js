require('angular');
Howl = require('howler');    // for sounds (if you need them)
Nodule = require('nodule');  // for nodule helpers

var app = angular.module('situation', [
]);

app.directive("situation", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/situation/situation.html"
    };
});

app.controller("situationController", ['data', '$scope', '$rootScope', '$sce', function(data, $scope, $rootScope, $sce) {

    var vm = this;
    vm.nodule = new Nodule($rootScope, 'situation', function() {
        console.log("onEntry", arguments);
        if (!arguments) {
          vm.dialogTree = {

          }
        }
    });

    $scope.step = {
      story: $sce.trustAsHtml("<h1>You're here</h1>"),
      question: "What do you do know, luke?",
      options: [
        {name: "fight"},
        {name: "run"},
        {name: "surrender"},
      ],
    }

    // your controller code here
    vm.clickedTheButton = function(){
        alert('you clicked situation button')
    }
}]);

module.exports = angular.module('situation').name;
