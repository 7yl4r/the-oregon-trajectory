require('angular')
Howl = require('howler')    # for sounds (if you need them)
Nodule = require('nodule')  # for nodule helpers

app = angular.module('debris-encounter', [])

app.directive("debrisEncounter", ()->
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/debrisEncounter/debrisEncounter.html"
    }
)

app.controller("debrisEncounterController", ['data', '$scope', '$rootScope', (data, $scope, $rootScope)->
    @nodule = new Nodule($rootScope, 'debris-encounter')
    @step = 'encounter'
    @debrisVelocity = 200
    @debrisIntersectDistance = 300
    @debrisSize = 3
    @debrisDensity = 1000
    @debrisCertainty = .9
    # TODO: compute cost based on relative velocity
    @rendevousCost = 10
    @avoidCost = 5
    # TODO: compute fuel based on size/density
    @debrisFuel = 20

    @continueTravels = ()=>
        $scope.$emit('switchToModule', 'travel-screen');

    @ignore = ()=>
        # TODO: chance of collision based on distance, certainty
        chanceOfCollision = .2;
        # TODO: severity of collision based on density, velocity, size
        if Math.random() < chanceOfCollision
            @step = 'collide'
        else
            @continueTravels

    @avoid = ()=>
        data.fuel -= @avoidCost
        @continueTravels()

    @harvest = ()=>
        @step = 'harvest'
        data.fuel += @debrisFuel

])

module.exports = angular.module('debris-encounter').name