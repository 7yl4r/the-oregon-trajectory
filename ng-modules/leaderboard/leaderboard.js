require('angular');
Nodule = require('nodule');  // for nodule helpers

var app = angular.module('leaderboard', [
    require('score')
]);

app.directive("leaderboard", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/leaderboard/leaderboard.html"
    };
});

app.controller("leaderboardController", ['leaderboard', 'data', '$scope', '$rootScope', function(leaderboard, data, $scope, $rootScope) {
    var vm = this;

    vm.onEntry = function(){
        vm.updateScores()
    }
    vm.nodule = new Nodule($rootScope, 'leaderboard', vm.onEntry);
    vm.scores = [{name:'test', score:'1234'}];

    vm.updateScores = function(){
        leaderboard.passTopScoresTo(function(scores){
            vm.scores = scores;
            //scores.forEach(function(score){
            //    console.log(score.name, ':', score.score);
            //});
            //alert('coming soon!');
        });
    }

    // your controller code here
    vm.clickedTheButton = function(){
        $scope.$emit('switchToModule', 'main-menu');
    }
}]);

module.exports = angular.module('leaderboard').name;