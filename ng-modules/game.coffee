require('angular')
Location = require('./Location.coffee')

window.TRAVEL_SPEED = 1 # pixels per movement tick of tile travel
window.TRAVELS_PER_MOVE = 5  # TRAVEL_SPEED divisor (for getting < 1 TRAVEL_SPEED)

DIST_PIX        = 33000
ISS_DIST_AU     = 0.000002
MOON_DIST_AU    = 0.0015
MARS_DIST_AU    = 1.9608
CERES_DIST_AU   = 1.6243
EUROPA_DIST_AU  = 3.2486
AU_2_KM         = 149597871
PIX_2_AU_ISS    = ISS_DIST_AU/1000 * AU_2_KM
PIX_2_AU_MOON   = MOON_DIST_AU/DIST_PIX * 2 * AU_2_KM
PIX_2_AU_MARS   = MARS_DIST_AU/DIST_PIX * 2 * AU_2_KM
PIX_2_AU_CERES  = CERES_DIST_AU/DIST_PIX * 2 * AU_2_KM
PIX_2_AU_EUROPA = EUROPA_DIST_AU/DIST_PIX * 2 * AU_2_KM

DIST_ISS         = 1000
DIST_MOON_MANU   = parseInt(DIST_ISS + DIST_PIX/2)
DIST_MOON        = parseInt(DIST_MOON_MANU + DIST_PIX/2)
DIST_MARS_MANU   = parseInt(DIST_MOON + DIST_PIX/2)
DIST_MARS        = parseInt(DIST_MARS_MANU + DIST_PIX/2)
DIST_CERES_MANU  = parseInt(DIST_MARS + DIST_PIX/2)
DIST_CERES       = parseInt(DIST_CERES_MANU + DIST_PIX/2)
DIST_EUROPA_MANU = parseInt(DIST_CERES + DIST_PIX/2)
DIST_EUROPA      = parseInt(DIST_EUROPA_MANU + DIST_PIX/2)

class Game
    constructor: (gameScope)->
        @scope = gameScope

        @gameDir = "" # "/the-oregon-trajectory" #  for conversion between gh-pages and local server
        @_init()  # initializes params

    _init: ()->
        # re-initializes the game
        # TODO: move this...
        shopFunc = ()=>
            @scope.$broadcast('switchToModule', 'shop')
        winFunc = ()=>
            @scope.$broadcast('switchToModule', 'you-win')
        @locations = [
            new Location("iss", DIST_ISS, PIX_2_AU_ISS, "station", shopFunc),
            new Location("moon-maneuver", DIST_MOON_MANU, PIX_2_AU_MOON, "maneuver"),
            new Location("moon", DIST_MOON, PIX_2_AU_MOON, "station", shopFunc),
            new Location("mars-maneuver", DIST_MARS_MANU, PIX_2_AU_MARS, "maneuver"),
            new Location("mars", DIST_MARS, PIX_2_AU_MARS, "station", shopFunc),
            new Location("ceres-maneuver", DIST_CERES_MANU, PIX_2_AU_CERES, "maneuver"),
            new Location("ceres", DIST_CERES, PIX_2_AU_CERES, "station", shopFunc),
            new Location("europa-maneuver", DIST_EUROPA_MANU, PIX_2_AU_EUROPA, "maneuver"),
            new Location("jupiter", DIST_EUROPA-DIST_MOON, PIX_2_AU_EUROPA-PIX_2_AU_MOON, "maneuver"),
            new Location("europa", DIST_EUROPA, PIX_2_AU_EUROPA, "station", winFunc)
            new Location("END_OF_UNIVERSE", DIST_EUROPA+DIST_ISS, PIX_2_AU_EUROPA+PIX_2_AU_ISS, "maneuver")
        ]

        @distanceTraveled = 0
        @displayDistanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100

        @rations = 0
        @eatChance = 0.1  # chance of eating per tick

        @fuel = 0
        @fuelExpense = 0.1; # main thruster during normal gameplay
        @fuelChance = 0.7;  # chance of expending fuel per tick

        @miningFuelExpenseThrust = @fuelExpense*@fuelChance*0.25; # asteroid mining main thruster throttle
        @miningFuelExpenseRotate = @miningFuelExpenseThrust*0.1; # asteroid mining rotating the ship left/right
        @miningFuelExpenseFiringBullet = @miningFuelExpenseRotate*0.001; # firing a bullet
        @miningFuelPerPartMin = 0
        @miningFuelPerPartMax = 5
        @miningCreditsPerPartMin = 2
        @miningCreditsPerPartMax = 8


        @radiationChance = .005  # chance of being irradiated per tick
        @money = 5000
        @visited = ['ksc']
        @nextWaypoint = @_getStatsToNextLocation()
        # nextWaypoint looks like:
        # {
        #   distance:       111,    # distance to the place
        #   name:      "the place",
        #   location:       333,    # absolute location of the place
        #   travelRate:     444,    # estimate of fuel to get there
        #   fuelEstimate:   555,    # estimate of rations to get there
        #   rationEstimate: 666     # current pixel-to-distance ratio
        # }

    travel: ()->
        # progress 1 time-tick of travel and update the game values
        if @fuel >= @fuelExpense
            @distanceTraveled += TRAVEL_SPEED
            @displayDistanceTraveled += Math.round(TRAVEL_SPEED * @nextWaypoint.travelRate)
            if Math.random() < @fuelChance
                @fuel -= @fuelExpense
        else
            @end()

        if Math.random() < @radiationChance
            @irradiate()

        if @rations < 1  # starvation
            for crew_i of @crewHealth
                @hurtCrew(crew_i, Math.random()*0.6)
        else
            if Math.random() < @eatChance  # if hungry
                @rations -= @crewHealth.length  # eat

        # update next location if needed
        if @distanceTraveled > @nextWaypoint.location
            @nextWaypoint = @_getStatsToNextLocation()
        else  # just update the distance
            @nextWaypoint.distance = @nextWaypoint.location - @distanceTraveled
            @nextWaypoint.displayDistance = Math.round(@nextWaypoint.distance * @nextWaypoint.travelRate)

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
        window.TRAVEL_SPEED = 10

    # === "private" methods ===
    _getRemainingLocations: ()->
        # returns array of locations not yet reached
        remainingLocs = []
        for location in @locations
            if location.x > @distanceTraveled
                remainingLocs.push(location)
        return remainingLocs

    _getStatsToNextLocation: ()->
        # returns distance, location, & name of next location as dict
        # {
        #   distance:       111,    # distance to the place
        #   name:      "the place",
        #   location:       333,    # absolute location of the place
        #   travelRate:     444,    # estimate of fuel to get there
        #   fuelEstimate:   555,    # estimate of rations to get there
        #   rationEstimate: 666     # current pixel-to-distance ratio
        # }
        # location is relative to starting position, distance is relative to current ship position
        remaining = @_getRemainingLocations()

        # get minimum of remaining locations
        next = {}
        next.location = remaining[0].x
        next.travelRate     = remaining[0].xdot
        next.name     = remaining[0].name
        for i of remaining
            if remaining[i].x < next.distance  # assumes no equal distances
                next.location = remaining[i].x
                next.travelRate     = remaining[i].xdot
                next.name     = remaining[i].name

            # calculate distance remaining before arrival
        next.distance = next.location - @distanceTraveled
        next.displayDistance = Math.round(next.distance * next.travelRate)
        next.fuelEstimate = next.distance * @fuelExpense * @fuelChance / TRAVEL_SPEED
        next.rationEstimate = next.distance * @eatChance * @crewHealth.length / TRAVEL_SPEED
        return next

    _calcShipHealth: ()->
        # recalculates shipHealth summary of health of remaining crew members
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
