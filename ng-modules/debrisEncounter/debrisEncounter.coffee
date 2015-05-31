require('angular')
Nodule = require('nodule')  # for nodule helpers

app = angular.module('debris-encounter', [
    require('game-btn')
])

app.directive("debrisEncounter", ()->
    return {
        restrict: 'E',
        templateUrl: "ng-modules/debrisEncounter/debrisEncounter.html"
    }
)

app.controller("debrisEncounterController", ['data', '$scope', '$rootScope', (data, $scope, $rootScope)->
    @MAX_VELOCITY = 10000  # m/s
    @MAX_DISTANCE = 10000  # m
    @MAX_SIZE = 10  # m  (actual max is this # + MIN_SIZE)
    @MIN_SIZE = .1  # m
    @MIN_DENSITY = 10  # kg/L
    @MAX_DENSITY = 8000  # kg/L (actual max is this # + MIN_DENSITY)

    @dir = data.gameDir+'/ng-modules/debrisEncounter'

    @onEntry = ()=>
        @step = 'encounter'
        # randomly generate parameters
        @debrisVelocity = parseInt(Math.random()*@MAX_VELOCITY)
        @debrisIntersectDistance = parseInt(Math.random() * @MAX_DISTANCE)
        @debrisSize = parseInt(Math.random() * @MAX_SIZE + @MIN_SIZE)
        @debrisDensity = parseInt(Math.random() * @MAX_DENSITY + @MIN_DENSITY)

        @rendevousCost = @getCostToRendevous()
        @avoidCost = @getCostToAvoid()
        @debrisFuel = @getFuelReward()  # TODO: use debris object w/ different rewards, response text, risks, etc

    @nodule = new Nodule($rootScope, 'debris-encounter', @onEntry)

    @getCostToRendevous = ()=>
        # returns cost to rendevous with debris
        return parseInt((@debrisVelocity + @debrisIntersectDistance * 0.2) * 0.02)

    @getCostToAvoid = ()=>
        # returns cost to avoid collision with the object with 100% certainty
        return parseInt((@MAX_DISTANCE*1.1 - @debrisIntersectDistance*0.2) * 0.02)

    @getFuelReward = ()=>
        # returns amount of fuel in the debris
        if @debrisDensity > 6000  # if too dense
            return 0
        else if @debrisDensity < 200  # if not dense enough
            return 0
        else
            percentFuel = Math.random()*0.7  # percent of object that is fuel
            return parseInt(@debrisSize*@debrisSize*@debrisSize*percentFuel * @debrisDensity/@MAX_DENSITY * 10)

    @continueTravels = ()=>
        $scope.$emit('switchToModule', 'travel-screen');

    @ignore = ()=>
        # TODO: chance of collision based on distance, certainty
        chanceOfCollision = .2;
        # TODO: severity of collision based on density, velocity, size
        if Math.random() < chanceOfCollision
            @step = 'collide'
        else
            @continueTravels()

    @avoid = ()=>
        data.fuel -= @avoidCost
        @continueTravels()

    @harvest = ()=>
        @step = 'harvest'
        data.fuel += @debrisFuel

    @help = ()=>
        @step = 'help'

    @getHarvestText = ()=>
        # returns text describing the situation based on resources found
        if @debrisDensity < 200
            return "This is no more than a cloud of dust and gas. Probably remnants from a collision or else someone has already been here and collected all the good stuff."
        else if @debrisDensity > 6000
            return "As you approach the debris your readings confirm that there is no fuel on board, in fact, this is just a giant hunk of metal! You survey the debris for hints of it's origin but find no clues."
        else 
            debris_choices = ["communications satellite", "pioneer ship", "surveillance satellite"]
            debris_type = debris_choices[Math.floor(Math.random() * debris_choices.length)]
            if @debrisFuel == 0
                return "This appears to be the remains of a " + debris_type + ". The technology is not much of use to you, and you find nothing else of use."
            else if @debrisFuel > 0 && @debrisFuel < 500
                return "This appears to be the remains of a " + debris_type + ". The technology is not much of use to you, but there is a small amount of fuel on board."
            else
                return "You've discovered someone's fuel stash. Who knows when (or if) they'll be back, so you collect what you can."
])

module.exports = angular.module('debris-encounter').name
