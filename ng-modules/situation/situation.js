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
    vm.nodule = new Nodule($rootScope, 'situation', function(dialog, currentStep) {
        $scope.dialog = dialog;
        $scope.currentStep = currentStep || 'initial';
    });
    vm.data = data;

    $scope.$watch('currentStep', function(step) {
        $scope.prepareStep(step);
    });

    $scope.$watch('dialog', function() {
        $scope.prepareStep($scope.currentStep);
    });

    $scope.prepareStep = function(step) {
        console.log('preparing ', step, $scope.dialog);
        $scope.currentStep = step;
        if ($scope.dialog && $scope.dialog[step]) {
          $scope.step = $scope.dialog[step];
          $scope.step.story = $sce.trustAsHtml($scope.step.story);
        } else {
          console.error('missing step in dialog definition', $scope.step, $scope.dialog);
          $scope.step = {};
        }
    };

    $scope.choose = function(choice){
        if (typeof choice.next === 'string') {
          $scope.currentStep = choice.next;
        } else if (typeof choice.next === 'function') {
          choice.next(vm.data);
        } else {
          alert("can't handle next of type "+(typeof choice.next)+" and value "+choice.next);
        }
    }
}]);

module.exports = angular.module('situation').name;
