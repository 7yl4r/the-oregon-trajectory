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
    vm.img = document.getElementById("test-bg");
    vm.tileW = 1920;  // TODO: load this dynamically
    vm.shipImg = document.getElementById("player-ship");

    vm.travel = function(){
        //console.log('travel!');
        vm.x -= TRAVEL_SPEED;

        // append new bg tile if needed
        var overhang = vm.tileW + vm.x - window.innerWidth;
        console.log(overhang);
        if (overhang < 100){
            console.log('need new tile');
        }
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
        var shipW = 150, shipH = 338;
        vm.ctx.drawImage(vm.shipImg, window.innerWidth/2-shipW/2, 300-shipH/2);
    }

    $scope.$on('draw', vm.drawBg);
}]);

module.exports = angular.module('travel-screen').name;