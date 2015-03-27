require('angular');

var app = angular.module('travel-screen', [
    require('ng-hold')
]);

app.directive("travelScreen", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/travelScreen/travelScreen.html"
    };
});

app.controller("travelScreenController", ['$scope', function($scope){
    window.TRAVEL_SPEED = 1;  // pixels per movement tick
    var vm = this;
    vm.x = 0;
    // TODO: do these need to be set after $(document).ready()?
    vm.canvasElement = document.getElementById("travelCanvas");
    vm.ctx = vm.canvasElement.getContext("2d");
    vm.img = document.getElementById("scream");

    vm.travel = function(){
        //console.log('travel!');
        vm.x -= TRAVEL_SPEED;
    }

    vm.reposition = function(){
        var pad = 30;  // estimated size of vertical scrollbar to prevent appearance of horiz. scrollbar

        // move element to far left of screen
        var bodyRect = document.body.getBoundingClientRect(),
        elemRect = vm.canvasElement.getBoundingClientRect(),
        offset   = elemRect.left - bodyRect.left;

        // console.log('Element is ' + offset + ' horizontal pixels from <body>');
        var prevPos = parseInt(vm.canvasElement.style.marginLeft);
        if (isNaN(prevPos)){ prevPos = 0; }
        vm.canvasElement.style.marginLeft = prevPos-offset + 'px';
        vm.canvasElement.style.left = 0;

        // resize element to window
        vm.ctx.canvas.width  = window.innerWidth - pad;
    }

    vm.drawBg = function(){
        vm.reposition();  //TODO: only do this when needed, not every draw

        vm.ctx.drawImage(vm.img, vm.x, 0);
    }

    $scope.$on('draw', vm.drawBg);
}]);

module.exports = angular.module('travel-screen').name;