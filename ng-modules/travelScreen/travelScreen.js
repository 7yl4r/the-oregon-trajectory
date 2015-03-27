require('angular');

var app = angular.module('travel-screen', []);

app.directive("travelScreen", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/travelScreen/travelScreen.html"
    };
});

app.controller("travelScreenController", function(){
    var TRAVEL_SPEED = 5;  // pixels per movement tick
    var vm = this;
    vm.x = 0;
    // TODO: do these need to be set after $(document).ready()?
    vm.c = document.getElementById("travelCanvas");
    vm.ctx = vm.c.getContext("2d");
    vm.img = document.getElementById("scream");

    vm.travel = function(){
        console.log('travel!');
        vm.x -= TRAVEL_SPEED;
        vm.drawBg();
    }

    vm.drawBg = function(){
        // resize to window  TODO: only do this when needed, not every draw
        var rect = vm.window.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);

        vm.ctx.canvas.width  = window.innerWidth;
        vm.ctx.canvas.height = window.innerHeight;

        vm.ctx.drawImage(vm.img, vm.x, 0);
    }
});

window.drawBg = function() {

}

//drawBg();

module.exports = angular.module('travel-screen').name;