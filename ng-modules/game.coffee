require('angular')

class Game
    constructor: (gameScope)->
        @scope = gameScope
        @locations = {
            "ksc":0,
            "iss": 1000,
            "moon":10000,
            "mars":100000
        }
        @gameDir = "" # "/the-oregon-trajectory" #  for conversion between gh-pages and local server
        @_init()  # initializes params

    _init: ()->
        # re-initializes the game
        @distanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100
        @rations = 0
        @fuel = 0
        @fuelExpense = 0.1;
        @radiationChance = .005
        @money = 1000
        @visited = ['ksc']
        @nextWaypoint = @_getStatsToNextLocation()

        # "private" properties
        @_shipX = window.innerWidth/3

    travel: ()->
        # progress 1 time-tick of travel and update the game values
        if @fuel >= @fuelExpense
            @distanceTraveled += 1
            if Math.random() < 0.7
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

        # update next location if needed
        if @distanceTraveled > @nextWaypoint.location
            @nextWaypoint = @_getStatsToNextLocation()
        else  # just update the distance
            @nextWaypoint.distance = @nextWaypoint.location - @distanceTraveled

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

    # === debug helper methods ===
    GODMODE: ()->
        BIG_NUMBER = 99999999999
        @crewHealth = [BIG_NUMBER, BIG_NUMBER]
        @fuel = BIG_NUMBER
        TRAVEL_SPEED = 20

    # === "private" methods ===
    _getRemainingLocations: ()->
        # returns obj with aligned arrays of locations & distances not yet reached
        locNames = []
        locDists = []
        for key of @locations
            if @locations[key] > @distanceTraveled
                locNames.push(key)
                locDists.push(@locations[key])
        return {
        "names": locNames,
        "distances": locDists
        }

    _getStatsToNextLocation: ()->
        # returns distance, location, & name of next location as dict
        # {
        #   distance: 222,
        #   name: "the place",
        #   location: 555
        # }
        # location is relative to starting position, distance is relative to current ship position
        remaining = @_getRemainingLocations()

        # get minimum of remaining locations
        next = {}
        next.location = remaining.distances[0]
        next.name     = remaining.names[0]
        for i of remaining.distances
            if remaining.distances[i] < next.distance  # assumes no equal distances
                next.location = remaining.distances[i]
                next.name = remaining.names[i]

            # calculate distance remaining before arrival
        next.distance = next.location - @distanceTraveled - window.innerWidth/3  # adust for ship position
        return next

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
    window.game = game
    return game
])

module.exports = angular.module('game').name
