Reputation = require('./gameUtils/Reputation.coffee')
Score = require('./gameUtils/Score.coffee')
Phaser = require('phaser')
Randy = require('./gameUtils/Randy/Randy.coffee')
EncounterManager = require('./gameManagers/EncounterManager.js')
LocationManager = require('./gameManagers/LocationManager.js')

window.TRAVEL_SPEED = 3 # pixels per movement tick of tile travel
# NOTE: this base speed does not affect travel time between planets b/c
#           it is used to calculate those distances. Ships can travel faster
#           and slower than this; this speed is a reasonable estimate of average
#           travel speed in pixels per frame.
window.TRAVELS_PER_MOVE = 5  # TRAVEL_SPEED divisor (for getting < 1 TRAVEL_SPEED)

AU_2_KM         = 149597871

class Game
    constructor: ()->
        @gameDir = "" # "/the-oregon-trajectory" # for conversion between gh-pages and local server

        # game signals
        @locationArrivalSignal = new Phaser.Signal()

        @UISettings = {
            pad: 10,  # space between things
            fontSize: 16,
            statusPanelHeight: 70,  # status display on travelScreen & shop
            statusSupplyWidth: 230,
            statusTrajWidth: 230,
            statusHealthWidth: 230,
            buttonH: 80,  # suggested button size
            buttonW: 140,
            panelAlpha: 0.4,  # suggested panel opacity
            leftPanelW: 400-10,
            middlePanelH: 300
        }
        @UISettings.middlePanelTop = @UISettings.statusPanelHeight+@UISettings.pad
        # middle panel height should fill space in between status panel and
        #   bottom panel / buttons row.
        @UISettings.middlePanelH = globalData.h -
            ( @UISettings.middlePanelTop + @UISettings.buttonH + @UISettings.pad*2)

        # distances
        @worldWidth_AU = 13.6749  # TODO: move this into @trajectory data file

        @setTrajectory(require('./gameData/earth-europa-trajectory.js'))

        # debug vars
        @BYPASS_LOCATIONS = false

        @_init()  # initializes params

    _init: ()->
        # re-initializes the game
        @randy = new Randy();

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

    setTrajectory: (trajJSON)->
        # sets the trajectory from a given json object
        @trajectory = trajJSON.trajectory

        @setTravelTime(@trajectory.meta.travelTime, @)

        @encounterManager = new EncounterManager(trajJSON);
        @locationManager = new LocationManager(trajJSON);

    setTravelTime: (gameLength)->
        # sets game targeted length in minutes and adjusts distances between
        #   planets accordingly.
        gameTime = gameLength*60 # convert to seconds
        fps = 30
        @worldWidth = gameTime*TRAVEL_SPEED*fps  # [s] * [px]/[s] = [px]

        console.log('gameTime set to ' + gameLength + 'min. Width:' + @worldWidth + 'px');

        @trajectory.pixelsPerAU = @worldWidth/@trajectory.meta.totalDistance;

        # TODO: remove this:
        for locKey of @trajectory.locations
            loc = @trajectory.locations[locKey]
            loc.distance_px = (loc.distance + loc.distance_adj) / @worldWidth_AU * @worldWidth

        # window.traj = @trajectory  # TODO: remove this debug code

        # console.log('distances:', @distances)


    travel: (travelScreenState)->
        if !@BYPASS_LOCATIONS
            @encounterManager.checkForEncounter(this, travelScreenState)

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

        @updateNextWaypoint()

    updateNextWaypoint: ()->
        # update next location if needed
        if @distanceTraveled > @nextWaypoint.distance_px
            @nextWaypoint = @_getStatsToNextLocation()
        else  # just update the distance
            @nextWaypoint.distance = @nextWaypoint.location - @distanceTraveled
            @nextWaypoint.displayDistance = Math.round(@nextWaypoint.distance)

        # console.log('next waypoint:', @nextWaypoint);

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
        # AKA getLastEvent
        # returns most recently triggered event/location
        # returns null if no event yet triggered
        return encounterManager.getLastEncounter()

    getLocationTile: (xPosition)->  # TODO: implement this
        # returns location tile key for given x coordinate
        spriteW = 500
        closestPassedLoc = @trajectory.locations[0]
        if xPosition < @trajectory.locations[i].distance - spriteW/2
            if closestPassedLoc.distance < @trajectory.locations[i].distance
                closestPassedLoc = @trajectory.locations[i]
        return closestPassedLoc.name

    getNextLocIndex: ()->
        # assumes trajectory.locations are in order of encounter
        # always returns first loc, even if not passed
        for i of @trajectory.locations  # assumes we're traversing this in order...
            # console.log(@trajectory.locations[i].name, '?')
            if @trajectory.locations[i].distance_px > @distanceTraveled
                # console.log('nextLoc:',i)
                return i
        # console.log('.')
        # else we've passed all locations
        return 0

    # === "private" methods ===
    _getRemainingLocations: ()->
        # returns array of locations not yet reached
        remainingLocs = []
        for locKey of @trajectory.locations
            if @trajectory[locKey].distance >  @distanceTraveled
                remainingLocs.push(@trajectory[locKey])
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
        #   spriteKey:            "maneuver"  # key for sprite lookup
        # }
        # location is relative to starting position, distance is relative to current ship position
        nextI = @getNextLocIndex();
        # console.log('nextLocIndex:',nextI);

        # add details nextLoc to fit legacy code
        @trajectory.locations[nextI].location = @trajectory.locations[nextI].distance_px

        @trajectory.locations[nextI].distanceLeft = @trajectory.locations[nextI].location - @distanceTraveled
        @trajectory.locations[nextI].displayDistance = Math.round(@trajectory.locations[nextI].distanceLeft)
        @trajectory.locations[nextI].fuelEstimate = @trajectory.locations[nextI].distanceLeft * @fuelExpense * @fuelChance / TRAVEL_SPEED
        @trajectory.locations[nextI].rationEstimate = @trajectory.locations[nextI].distanceLeft * @eatChance * @crewHealth.length / TRAVEL_SPEED

        console.log('next location set to: ', @trajectory.locations[nextI])
        return @trajectory.locations[nextI]

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
