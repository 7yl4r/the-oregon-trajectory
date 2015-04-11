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
    vm.nodule = new Nodule($rootScope, 'situation', function(dialog) {
        console.log("onEntry", arguments);
        if (!dialog) {
          dialog = {
            initial: {
                story:"starting out with <b>rocks</b>",
                question: "what do you do?",
                choices:[
                    {
                        name:"do think B",
                        next:"thingA"
                    },
                    {
                        name:"do thing A",
                        next:function() {
                          alert('well done!');
                        }
                    }
                ]
            },
            thingA: {
                story: "good so far",
                choices: [
                  {
                    name: "retry",
                    next: "initial"
                  }
                ]
            }
          };
        }

        vm.dialog = dialog;
        vm.prepareStep('initial');
    });

    vm.prepareStep = function(step) {
        vm.currentStep = step;
        $scope.step = vm.dialog[step];
        $scope.step.story = $sce.trustAsHtml($scope.step.story);
    };

    // your controller code here
    vm.choose = function(choice){
        alert('you choose '+choice.name);
    }
}]);

module.exports = angular.module('situation').name;
