require('angular');
require('howler');

var app = angular.module('game-btn', [
    require('game')
]);

app.directive("gameBtn", function() {
    return {
        restrict: 'AE',
        templateUrl: "ng-modules/gameBtn/gameBtn.html",
        transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant output
        scope: {
            text:'@'
        },
        link: function($scope, $el, $attr){

        }
    };
});

app.controller("gameBtnController", ['data', 'sounds', '$scope', '$rootScope', function(data, sounds, $scope, $rootScope){
    var vm = this;
    vm.clickSound = sounds.click;
}]);

module.exports = angular.module('game-btn').name;