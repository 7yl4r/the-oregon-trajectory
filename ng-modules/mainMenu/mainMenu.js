require('angular');
Nodule = require('nodule');

var app = angular.module('main-menu', [
    require('game-btn'),
    require('game')
]);

app.directive("mainMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "ng-modules/mainMenu/mainMenu.html"
    };
});

app.controller("mainMenuController", ['data', 'music', 'sounds', '$scope', '$rootScope', '$modal',
                              function(data,   music,   sounds,   $scope,   $rootScope,   $modal ){
    var vm = this;

    vm.onEntry = function() {
        $scope.$emit('changeMusicTo', music.theme);

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'ng-modules/mainMenu/welcomeModal.html',
            controller: 'ModalInstanceCtrl'
        });
    }

    vm.nodule = new Nodule($rootScope, 'main-menu', vm.onEntry)

    vm.startGame = function(){
        sounds.click.play();
        data.reset();
        $scope.$emit('switchToModule', 'ship-customizer');
    }

    vm.learnAbout = function() {
        $scope.$emit('switchToModule', 'situation', require('learn-about-trajectory'));
    }

    vm.showLeaderboard = function(){
        $scope.$emit('switchToModule', 'leaderboard');

        /* TODO: move this into ng-modules/leaderboard
        leaderboard.passTopScoresTo(function(scores){
            scores.forEach(function(score){
                console.log(score.name, ':', score.score);
            });
            alert('coming soon!');
        });
        */
    }
}]);

/* controller for the intro modal */
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

module.exports = angular.module('main-menu').name;
