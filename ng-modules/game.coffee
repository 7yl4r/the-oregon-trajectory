require('angular')

class Game
    constructor: (gameScope)->
        @scope = gameScope
        @_init()  # initializes params
        @locations = {
            "ksc":0,
            "iss": 1000,
            "moon":10000,
            "mars":100000
        }

    travel: ()->
        # progress 1 time-tick of travel and update the game values
        @distanceTraveled += 1
        if Math.random() < @radiationChance
            @irradiate()

    hurtCrew: (i, amnt)->
        # hurts crewmember i given amnt (and checks for death)
        @crewHealth[i] -= amnt
        if @crewHealth[i] < 1
            console.log('crew member died!')
            @scope.$broadcast('crew death', i)
            @crewHealth.splice(i, 1)  # remove the crew member

    irradiate: ()->
        # irradiates the crew; use with care
        healthChanged = false
        @crewHealth.forEach( (health, i)=>
            if Math.random() > 0.5
                healthChanged = true
                @hurtCrew(i, 1)
        )
        if healthChanged
            @_calcShipHealth()
            return

    _init: ()->
        # re-initializes the game
        @distanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100
        @rations = 0
        @fuel = 0
        @radiationChance = .1

    reset: ()->
        @_init()
        @scope.$broadcast('resetGame')
        return

    # === "private" methods ===
    _calcShipHealth: ()->
        # recalculates shipHealth summary of health of remaing crew members
        if @crewHealth.length < 1
            console.log('game over!')
            @scope.$broadcast('switchToModule', 'game-over')
            return

        healthSum = @crewHealth.reduce((prev,current)->
            return current + prev
        )
        @shipHealth = healthSum/@crewHealth.length
        return

app = angular.module('game', [])

app.factory('data', ['$rootScope', ($rootScope) ->
    game = new Game($rootScope)
    return game
])

module.exports = angular.module('game').name
