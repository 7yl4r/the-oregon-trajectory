require('angular');
require('howler');

var app = angular.module('game-btn', []);

app.directive("gameBtn", function() {
    return {
        restrict: 'AE',
        templateUrl: "/the-oregon-trajectory/ng-modules/gameBtn/gameBtn.html",
        transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant output
        scope: {
            text:'@'
        },
        link: function($scope, $el, $attr){

        }
    };
});

app.controller("gameBtnController", ['data', '$scope', '$rootScope', function(data, $scope, $rootScope){
    var vm = this;
    vm.clickSound = new Howl({
        urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
    });
}]);

module.exports = angular.module('game-btn').name;