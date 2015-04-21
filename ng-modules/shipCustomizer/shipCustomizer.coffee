require('angular')
Nodule = require('nodule')  # for nodule helpers
Sprite = require('../travelScreen/Sprite.coffee')

app = angular.module('ship-customizer', [
    require('game')
]);

app.directive("shipCustomizer", () ->
    return {
        restrict: 'E',
        templateUrl: "ng-modules/shipCustomizer/shipCustomizer.html"
    }
)

app.controller("shipCustomizerController", ['data', '$scope', '$rootScope', (data, $scope, $rootScope) ->
    @shipOptions = [
        {
            file: data.gameDir+'/assets/sprites/ship.png',
            name: "ship",
        }
        ,{
            file: data.gameDir+'/assets/sprites/ship_jesus.png',
            name: "ship-jesus"
        }
    ]
    @selectedShip = @shipOptions[0]
    @selectedShip.selected = true

    # nodule helps attach init. and teardown functions to events (and a few other things)
    @nodule = new Nodule($rootScope, 'ship-customizer')

    @pickShip = (ship)=>
        # this function is triggered by the button
        @selectedShip.selected = false
        ship.selected = true
        data.ship = new Sprite(ship.file, ship.name, 0, 'random');
        @selectedShip = ship

    @done = ()=>
        # TODO: data.savePlayer
        $scope.$emit('switchToModule', 'travel-screen')
])

# this is needed to connect with the main app.
module.exports = angular.module('ship-customizer').name