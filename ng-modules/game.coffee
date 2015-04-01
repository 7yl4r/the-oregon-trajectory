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
        @gameDir = "" # "/the-oregon-trajectory" #  for conversion between gh-pages and local server

    _init: ()->
        # re-initializes the game
        @distanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100
        @rations = 0
        @fuel = 0
        @fuelExpense = 0.25;
        @radiationChance = .005
        @money = 1000
        @visited = ['ksc']

    travel: ()->
        # progress 1 time-tick of travel and update the game values
        if @fuel >= @fuelExpense
            @distanceTraveled += 1
            @fuel -= @fuelExpense
        else
            @end()

        if Math.random() < @radiationChance
            @irradiate()

        if @rations < 1  # starvation
            for crew_i of @crewHealth
                @hurtCrew(crew_i, Math.random()*0.6)
        else
            if Math.random() < .01  # if hungry
                @rations -= @crewHealth.length  # eat

    hurtCrew: (i, amnt)->
        # hurts crewmember i given amnt (and checks for death)
        amnt = Math.round(amnt)
        @crewHealth[i] -= amnt
        if @crewHealth[i] < 1
            console.log('crew member died!')
            @scope.$broadcast('crew death', i)
            @crewHealth.splice(i, 1)  # remove the crew member
        # recalc ship health
        @_calcShipHealth()

    irradiate: ()->
        # irradiates the crew; use with care
        healthChanged = false
        @crewHealth.forEach( (health, i)=>
            healthChanged = true
            @hurtCrew(i, Math.random())
        )
        if healthChanged
            @_calcShipHealth()
            return

    reset: ()->
        @_init()
        @scope.$broadcast('resetGame')
        return

    end: ()->
        console.log('game over!')
        @scope.$broadcast('switchToModule', 'game-over')
        return

    # === "private" methods ===
    _calcShipHealth: ()->
        # recalculates shipHealth summary of health of remaing crew members
        if @crewHealth.length < 1
            @end()
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
