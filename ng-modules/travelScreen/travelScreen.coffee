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
    require('ng-hold'),
    require('game')
]);

app.directive("travelScreen", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/travelScreen/travelScreen.html"
    };
});

app.controller("travelScreenController", ['$scope', 'data', function($scope, data){
    var vm = this;
    vm.stationImg = document.getElementById("station-sprite");

    vm.init = function(){
        vm.gameData = data;
        vm.x = 0;
        // TODO: do these need to be set after $(document).ready()?
        vm.canvasElement = document.getElementById("travelCanvas");
        vm.ctx = vm.canvasElement.getContext("2d");
        vm.shipImg = document.getElementById("player-ship");

        vm.tiles = [new Tile(0, document.getElementById("sun-bg"))];
    }
    vm.init();
    $scope.$on('resetGame', vm.init);

    vm.travel = function(){
        //console.log('travel!');
        vm.x += TRAVEL_SPEED;

        vm.gameData.travel();

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

    vm.drawSprite = function(location, Xposition){
        // draws location if in view at global Xposition
        var spriteW = 288, spriteH = 500;

        // if w/in reasonable draw distance
        if (vm.x + window.innerWidth + spriteW > Xposition    // if close enough
            && vm.x - spriteW < Xposition                  ) { // if we haven't passed it
            // TODO:
            // if sprite already in current sprites
            // use existing y value (add small bit of drift?)
            // else
            // get random y value and add to list of current sprites
            var rel_x = Xposition-vm.x;  // position relative to window view
            vm.ctx.drawImage(vm.stationImg, rel_x - spriteW / 2, 300 - spriteH / 2);  // TODO: try to use gifs appended to dom
        }
    }

    vm.drawLocations = function(){
        for (var loc in data.locations){
            var pos = data.locations[loc];
            vm.drawSprite(loc, pos);
        }
    }

    vm.drawBg = function(){
        vm.tiles.forEach(function(tile) {
            tile.draw(vm.ctx);
        });
    }

    vm.drawShip = function(){
        var shipW = 150, shipH = 338;
        vm.ctx.drawImage(vm.shipImg, window.innerWidth/2-shipW/2, 300-shipH/2);
    }

    vm.draw = function(){
        // resize element to window
        vm.ctx.canvas.width  = window.innerWidth;  //TODO: only do this when needed, not every draw
        vm.drawBg();
        vm.drawLocations();
        vm.drawShip();
    }
    $scope.$on('draw', vm.draw);
}]);

module.exports = angular.module('travel-screen').name;
`