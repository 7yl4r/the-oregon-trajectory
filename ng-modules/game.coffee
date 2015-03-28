require('angular')

class Game
    constructor: (gameScope)->
        @scope = gameScope
        @distanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100

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

    travel: ()->
        # progress 1 time-tick of travel and update the game values
        healthChanged = false
        @crewHealth.forEach( (health, i)=>
            if Math.random() > 0.5
                healthChanged = true
                @crewHealth[i] -= 1
                if @crewHealth[i] < 1
                    console.log('crew member died!')
                    @scope.$broadcast('crew death', i)
                    @crewHealth.splice(i, 1)  # remove the crew member
        )
        if healthChanged
            @_calcShipHealth()
            return

    reset: ()->
        # re-initializes the game
        @distanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100
        @scope.$broadcast('resetGame')
        return

app = angular.module('game', [])

app.factory('data', ['$rootScope', ($rootScope) ->
    game = new Game($rootScope)
    return game
])

module.exports = angular.module('game').name
