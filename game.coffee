Location = require('./gameUtils/Location.coffee')
Sprite = require('./gameUtils/Sprite.coffee')
Reputation = require('./gameUtils/Reputation.coffee')
Score = require('./gameUtils/Score.coffee')
Phaser = require('phaser')

# stations:
iss = require('./assets/stations/iss/spriteSpec.js')
temp_marker = require('./assets/stations/marker1/spriteSpec.js')

window.TRAVEL_SPEED = 3 # pixels per movement tick of tile travel
# NOTE: this base speed does not affect travel time between planets b/c
#           it is used to calculate those distances. Ships can travel faster
#           and slower than this; this speed is a reasonable estimate of average
#           travel speed in pixels per frame.
window.TRAVELS_PER_MOVE = 5  # TRAVEL_SPEED divisor (for getting < 1 TRAVEL_SPEED)

AU_2_KM         = 149597871

class Game
    constructor: ()->

        @gameDir = "" # "/the-oregon-trajectory" #  for conversion between gh-pages and local server
        @locationArrivalSignal = new Phaser.Signal()
        @worldWidth_AU = 13.6749
        @landmarks = {
            EARTH: 'earth',
            ISS: 'iss',
            MANEUVER_MOON: 'moon-maneuver',
            MOON: 'moon',
            MANEUVER_MARS: 'mars-maneuver',
            MARS: 'mars',
            MANEUVER_CERES: 'ceres-maneuver'
            CERES: 'ceres',
            MANEUVER_JUPITER: 'jupiter-maneuver'
            JUPITER: 'jupiter',
            EUROPA: 'europa'
        }

        @distances = {}  # actual distances in AU
        @distances[@landmarks.ISS] =              0.0010
        @distances[@landmarks.EARTH] =            0.0
        @distances[@landmarks.MANEUVER_MOON] =    0.0015
        @distances[@landmarks.MOON] =             0.0015*2
        @distances[@landmarks.MANEUVER_MARS] =    0.0015*2+1.9608
        @distances[@landmarks.MARS] =             0.0015*2+1.9608*2
        @distances[@landmarks.MANEUVER_CERES] =   0.0015*2+1.9608*2+1.6243
        @distances[@landmarks.CERES] =            0.0015*2+1.9608*2+1.6243*2
        @distances[@landmarks.MANEUVER_JUPITER] = 0.0015*2+1.9608*2+1.6243*2+3.2486
        @distances[@landmarks.JUPITER] =          0.0015*2+1.9608*2+1.6243*2+3.2486*2
        @distances[@landmarks.EUROPA] =           0.0015*2+1.9608*2+1.6243*2+3.2486*2+.003

        @dist_adjustments = {}  # use these to move locations for gameplay reasons
        # calculations to come to these numbers from this spreadsheet:
        # https://docs.google.com/spreadsheets/d/1xrVJzQhPNw9-6lNZPf_-sr50t_ECjgUU8BIYq2M84ok/edit?usp=sharing
        @dist_adjustments[@landmarks.EARTH] =             0.1
        @dist_adjustments[@landmarks.MANEUVER_MOON] =     1.3
        @dist_adjustments[@landmarks.MOON] =              2.0
        @dist_adjustments[@landmarks.MANEUVER_MARS] =     1.5
        @dist_adjustments[@landmarks.MARS] =              1.0
        @dist_adjustments[@landmarks.MANEUVER_CERES] =    0.5
        @dist_adjustments[@landmarks.CERES] =             0.0
        @dist_adjustments[@landmarks.MANEUVER_JUPITER] = -1.5
        @dist_adjustments[@landmarks.JUPITER] =          -2.5
        @dist_adjustments[@landmarks.EUROPA] =           -1.0


        # debug vars
        @BYPASS_LOCATIONS = false
        @setTravelTime(5)

        @_init()  # initializes params

    _init: ()->
        # re-initializes the game
        # TODO: move this...
        shopFunc = ()=>
            # TODO:
            console.log('switch to shop');
        winFunc = ()=>
            # TODO:
            console.log('switch to win state');

        @locations = [
            new Location(@landmarks.ISS,
                @getDistance(@landmarks.ISS),
                "station",
                ()=>
                    @locationArrivalSignal.dispatch(@landmarks.EARTH)
                    shopFunc()
                ,
                new Sprite(@gameDir+iss.sheet, iss.dimensions, -1000, 'random')
            ),
            new Location(@landmarks.MANEUVER_MOON,
                @getDistance(@landmarks.MANEUVER_MOON),
                "maneuver"
            ),
            new Location(@landmarks.MOON,
                @getDistance(@landmarks.MOON),
                "station",
                ()=>
                    @locationArrivalSignal.dispatch(@landmarks.MOON)
                    shopFunc()
                ,
                new Sprite(@gameDir+temp_marker.sheet, temp_marker.dimensions, -1000, 'random')
            ),
            new Location(@landmarks.MANEUVER_MARS,
                @getDistance(@landmarks.MANEUVER_MARS),
                "maneuver"
            ),
            new Location(@landmarks.MARS,
                @getDistance(@landmarks.MARS),
                "station",
                ()=>
                    @locationArrivalSignal.dispatch(@landmarks.MARS)
                    shopFunc()
                ,
                new Sprite(@gameDir+temp_marker.sheet, temp_marker.dimensions, -1000, 'random')
            ),
            new Location(@landmarks.MANEUVER_CERES,
                @getDistance(@landmarks.MANEUVER_CERES),
                "maneuver"
            ),
            new Location(@landmarks.CERES,
                @getDistance(@landmarks.CERES),
                "station",
                ()=>
                    @locationArrivalSignal.dispatch(@landmarks.CERES)
                    shopFunc()
                ,
                new Sprite(@gameDir+temp_marker.sheet, temp_marker.dimensions, -1000, 'random')
            ),
            new Location(@landmarks.MANEUVER_JUPITER,
                @getDistance(@landmarks.MANEUVER_JUPITER),
                "maneuver"
            ),
            new Location(@landmarks.JUPITER,
                @getDistance(@landmarks.JUPITER),
                "maneuver",
                ()=>
                    @locationArrivalSignal.dispatch(@landmarks.JUPITER)
            ),
            new Location(@landmarks.EUROPA,
                @getDistance(@landmarks.EUROPA),
                "station",
                ()=>
                    @locationArrivalSignal.dispatch(@landmarks.EUROPA)
                    winFunc()
                ,
                new Sprite(@gameDir+temp_marker.sheet, temp_marker.dimensions, -1000, 'random')
            )
            new Location("END_OF_UNIVERSE",
                @getDistance(),
                "maneuver"
            )
        ]

        console.log('locs:', @locations)
        @reputation = new Reputation();
        @score = new Score();

        @distanceTraveled = 0
        @displayDistanceTraveled = 0
        @crewHealth = [100, 100]
        @shipHealth = 100

        @rations = 500
        @eatChance = 0.05  # chance of eating per tick

        @water = 500
        @drinkChance = 0.10  # chance of drinking per tick

        @fuel = 500
        @fuelExpense = 0.05; # main thruster during normal gameplay
        @fuelChance = 0.7;  # chance of expending fuel per tick

        @miningFuelExpenseThrust = @fuelExpense*@fuelChance*0.25; # asteroid mining main thruster throttle
        @miningFuelExpenseRotate = @miningFuelExpenseThrust*0.1; # asteroid mining rotating the ship left/right
        @miningFuelExpenseFiringBullet = @miningFuelExpenseRotate*0.001; # firing a bullet
        @miningFuelPerPartMin = 0
        @miningFuelPerPartMax = 5
        @miningCreditsPerPartMin = 2
        @miningCreditsPerPartMax = 8

        @radiationChance = .0005  # chance of being irradiated per tick
        @money = 5000
        @visited = ['ksc']
        @nextWaypoint = @_getStatsToNextLocation()
        # nextWaypoint looks like:
        # {
        #   distance:       111,    # distance to the place
        #   name:      "the place",
        #   location:       333,    # absolute location of the place
        #               :     444,    # estimate of fuel to get there
        #   fuelEstimate:   555,    # estimate of rations to get there
        #   rationEstimate: 666
        # }

    setTravelTime: (gameLength)->
        # sets game targeted length in minutes and adjusts distances between
        #   planets accordingly.
        gameTime = gameLength*60 # convert to seconds
        fps = 30
        @worldWidth = gameTime*TRAVEL_SPEED*fps  # [s] * [px]/[s] = [px]

        console.log('gameTime set to ' + gameLength + 'min. Width:' + @worldWidth + 'px')

        @distances_px = {}
        for distKey of @distances
            @distances_px[distKey] = (@distances[distKey] + @dist_adjustments[distKey]) / @worldWidth_AU * @worldWidth

        console.log('distances:', @distances)

    getDistance: (landmarkKey, units)->
        if units=='AU'
            return @distances[landmarkKey]
        else
            return @distances_px[landmarkKey]

    travel: ()->
        # progress 1 time-tick of travel and update the game values
        if @fuel >= @fuelExpense
            @distanceTraveled += TRAVEL_SPEED
            @displayDistanceTraveled += TRAVEL_SPEED/@worldWidth*@worldWidth_AU
            if Math.random() < @fuelChance
                @fuel -= @fuelExpense
        else
            @end()

        if Math.random() < @radiationChance
            @irradiate()

        if @rations < 1  # starvation
            for crew_i of @crewHealth
                @hurtCrew(crew_i, Math.random()*0.4)
        else
            if Math.random() < @eatChance  # if hungry
                @rations -= @crewHealth.length  # eat

        if @water < 1  # dehydration
            for crew_i of @crewHealth
                @hurtCrew(crew_i, Math.random()*0.6)
        else
            if Math.random() < @drinkChance
                @water -= @crewHealth.length

    updateNextWaypoint: ()->
        # update next location if needed
        if @distanceTraveled > @nextWaypoint.location
            @nextWaypoint = @_getStatsToNextLocation()
        else  # just update the distance
            @nextWaypoint.distance = @nextWaypoint.location - @distanceTraveled
            @nextWaypoint.displayDistance = Math.round(@nextWaypoint.distance)

        console.log('next waypoint:', @nextWaypoint);

    updateScore: ()->
        # updates the score
        @score.updateScore(@distanceTraveled, @reputation, @shipHealth, @money, @rations, @fuel, null);  # TODO: should pass ship object (DNE)

    hurtCrew: (i, amnt)->
        # hurts crewmember i given amnt (and checks for death)
        amnt = Math.round(amnt)
        @crewHealth[i] -= amnt
        if @crewHealth[i] < 1
            console.log('crew member died!')
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
        # TODO:
        console.log('TODO: resetGame')
        return

    end: ()->
        console.log('game over!')
        # TODO: switch to game over state
        return

    # === debug helper methods ===
    BYPASS: ()->
        # toggles location/event bypass
        @BYPASS_LOCATIONS = !@BYPASS_LOCATIONS

    GODMODE: ()->
        # toggles god mode
        BIG_NUMBER = 99999999999
        @crewHealth = [BIG_NUMBER, BIG_NUMBER]
        @fuel = BIG_NUMBER

    getCurrentEvent: ()->
        # returns most recently triggered event/location
        # returns null if no event yet triggered
        lastName = @visited[@visited.length-1]
        for location in @locations
            if location.name == lastName
                return location
            # else keep looking
        # else
        return null

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
        #                   444,    # estimate of fuel to get there
        #   fuelEstimate:   555,    # estimate of rations to get there
        #   rationEstimate: 666
        # }
        # location is relative to starting position, distance is relative to current ship position
        remaining = @_getRemainingLocations()

        # get minimum of remaining locations
        next = {}
        next.location = remaining[0].x
        next.name     = remaining[0].name
        for i of remaining
            if remaining[i].x < next.distance  # assumes no equal distances
                next.location = remaining[i].x
                next.name     = remaining[i].name

            # calculate distance remaining before arrival
        next.distance = next.location - @distanceTraveled
        next.displayDistance = Math.round(next.distance)
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

module.exports = Game
