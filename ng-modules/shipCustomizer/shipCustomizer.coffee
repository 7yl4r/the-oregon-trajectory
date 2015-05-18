require('angular')
Nodule = require('nodule')  # for nodule helpers
Sprite = require('../travelScreen/Sprite.coffee')

app = angular.module('ship-customizer', [
    require('game'),
    require('game-btn')
]);

app.directive("shipCustomizer", () ->
    return {
        restrict: 'E',
        templateUrl: "ng-modules/shipCustomizer/shipCustomizer.html"
    }
)

app.controller("shipCustomizerController", ['data', 'sounds', '$scope', '$rootScope', (data, sounds, $scope, $rootScope) ->
    @shipOptions = [
        {
            file: data.gameDir+'/assets/sprites/ship.png',
            name: "J-R0D manned crew capsule U",
            spriteSpecs: "ship",
            description: "this rocket gained popularity amongst space pioneers for it's unique red ceramic powder coat."
        }
        ,{
            file: data.gameDir+'/assets/sprites/ship_jesus.png',
            name: "jesus's modified Orion mk3",
            spriteSpecs:{
                h: 150,
                w: 270,
                scale: 0.6
            },
            description: "based in part on the Orion capsule, this consumer craft takes a modular approach to craft design."
        }
    ]
    @selectedShip = @shipOptions[0]
    @selectedShip.selected = true

    # nodule helps attach init. and teardown functions to events (and a few other things)
    @nodule = new Nodule($rootScope, 'ship-customizer')

    @pickShip = (ship)=>
        # this function is triggered by the button
        sounds.click.play()
        @selectedShip.selected = false
        ship.selected = true
        data.ship.setSheet(ship.file, ship.spriteSpecs);
        @selectedShip = ship

    @done = ()=>
        # TODO: data.savePlayer
        $scope.$emit('switchToModule', 'travel-screen')
])

# this is needed to connect with the main app.
module.exports = angular.module('ship-customizer').name