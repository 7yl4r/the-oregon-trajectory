require('angular');

window.TRAVEL_SPEED = 1 # pixels per movement tick

# TODO: move this to separate file and require it here
class Tile
    constructor: (startX, imageElement)->
        @x = startX
        @img = imageElement
        @tileW = 1920  # TODO: load this dynamically

    draw: (ctx)->
        # draws the tile
        ctx.drawImage(@img, @x, 0)
        return

    travel: ()->
        # moves the tile 1 travel unit
        @x -= window.TRAVEL_SPEED

    getOverhang: ()->
        # returns theoretical amount of tile overhanging right of screen, yet to be traveled to
        return @tileW + @x - window.innerWidth

    hasTravelledOffscreen: ()->
        # returns true if tile has travelled left off screen
        return (@tileW + @x) < 0

# switching to javascript here...
`
var app = angular.module('travel-screen', [
    require('ng-hold')
]);

app.directive("travelScreen", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/travelScreen/travelScreen.html"
    };
});

app.controller("travelScreenController", ['$scope', function($scope){
    var vm = this;
    vm.x = 0;
    // TODO: do these need to be set after $(document).ready()?
    vm.canvasElement = document.getElementById("travelCanvas");
    vm.ctx = vm.canvasElement.getContext("2d");
    vm.shipImg = document.getElementById("player-ship");

    vm.tiles = [new Tile(0, document.getElementById("test-bg"))];

    vm.travel = function(){
        //console.log('travel!');
        vm.x += TRAVEL_SPEED;

        vm.tiles.forEach(function(tile){
            tile.travel();
        });

        // remove old offscreen tiles
        while(vm.tiles[0].hasTravelledOffscreen()){
            vm.tiles.splice(0, 1);  // remove leftmost tile
            console.log('tile removed');
        }

        // append new bg tiles if needed
        var overhang = vm.tiles[vm.tiles.length - 1].getOverhang();
        while (overhang < 100){
            vm.tiles.push(new Tile(window.innerWidth + overhang, document.getElementById("test-bg")));
            overhang = vm.tiles[vm.tiles.length -1].getOverhang();
            console.log('tile added');
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

        vm.tiles.forEach(function(tile) {
            tile.draw(vm.ctx);
        });

        var shipW = 150, shipH = 338;
        vm.ctx.drawImage(vm.shipImg, window.innerWidth/2-shipW/2, 300-shipH/2);
    }

    $scope.$on('draw', vm.drawBg);
}]);

module.exports = angular.module('travel-screen').name;
`