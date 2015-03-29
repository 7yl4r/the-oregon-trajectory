require('angular');

var app = angular.module('main-menu', []);

app.directive("mainMenu", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/mainMenu/mainMenu.html"
    };
});

app.controller("mainMenuController", ['data', '$scope', function(data, $scope){
    var vm = this;

    vm.startGame = function(){
        data.reset();
        $scope.$emit('switchToModule', 'shop');
    }
}]);

module.exports = angular.module('main-menu').name;