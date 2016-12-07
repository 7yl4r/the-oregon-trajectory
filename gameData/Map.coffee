Location = require('./Location.coffee')

#// TODO: move this...
shopFunc = ()->
    globalData.game.state.start('shop');
    console.log('switch to shop');

winFunc = ()->
    #// TODO:
    console.log('switch to win state');


LANDMARKS = {
    EARTH: 'earth',
    ISS: 'iss',
    MANEUVER_MOON: 'moon-maneuver',
    MOON: 'moon',
    MANEUVER_MARS: 'mars-maneuver',
    MARS: 'mars',
    MANEUVER_CERES: 'ceres-maneuver',
    CERES: 'ceres',
    MANEUVER_JUPITER: 'jupiter-maneuver',
    JUPITER: 'jupiter',
    EUROPA: 'europa'
}

module.exports = class Map
    constructor: (gameData)->
        @landmarks = LANDMARKS
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

        @setTravelTime(5, gameData)

        @stations = [
            new Location(
                LANDMARKS.ISS,
                @getDistance(LANDMARKS.ISS),
                LANDMARKS.ISS+'-station',
                ()=>
                    gameData.locationArrivalSignal.dispatch(LANDMARKS.EARTH)
                    shopFunc()
            ),
            new Location(LANDMARKS.MANEUVER_MOON,
                @getDistance(LANDMARKS.MANEUVER_MOON),
                "maneuver"
            ),
            new Location(LANDMARKS.MOON,
                @getDistance(LANDMARKS.MOON),
                LANDMARKS.MOON+'-station',
                ()=>
                    gameData.locationArrivalSignal.dispatch(LANDMARKS.MOON)
                    shopFunc()
            ),
            new Location(LANDMARKS.MANEUVER_MARS,
                @getDistance(LANDMARKS.MANEUVER_MARS),
                "maneuver"
            ),
            new Location(LANDMARKS.MARS,
                @getDistance(LANDMARKS.MARS),
                LANDMARKS.MARS+'-station',
                ()=>
                    gameData.locationArrivalSignal.dispatch(LANDMARKS.MARS)
                    shopFunc()
            ),
            new Location(LANDMARKS.MANEUVER_CERES,
                @getDistance(LANDMARKS.MANEUVER_CERES),
                "maneuver"
            ),
            new Location(LANDMARKS.CERES,
                @getDistance(LANDMARKS.CERES),
                LANDMARKS.CERES+'-station',
                ()=>
                    gameData.locationArrivalSignal.dispatch(LANDMARKS.CERES)
                    shopFunc()
            ),
            new Location(LANDMARKS.MANEUVER_JUPITER,
                @getDistance(LANDMARKS.MANEUVER_JUPITER),
                "maneuver"
            ),
            new Location(LANDMARKS.JUPITER,
                @getDistance(LANDMARKS.JUPITER),
                "maneuver",
                ()=>
                    gameData.locationArrivalSignal.dispatch(LANDMARKS.JUPITER)
            ),
            new Location(LANDMARKS.EUROPA,
                @getDistance(LANDMARKS.EUROPA),
                LANDMARKS.EUROPA+'-station',
                ()=>
                    gameData.locationArrivalSignal.dispatch(LANDMARKS.EUROPA)
                    winFunc()
            ),
            new Location("END_OF_UNIVERSE",
                gameData.worldWidth,
                "maneuver"
            )
        ]

    setTravelTime: (gameLength, gameData)->
        # sets game targeted length in minutes and adjusts distances between
        #   planets accordingly.
        gameTime = gameLength*60 # convert to seconds
        fps = 30
        gameData.worldWidth = gameTime*TRAVEL_SPEED*fps  # [s] * [px]/[s] = [px]

        console.log('gameTime set to ' + gameLength + 'min. Width:' + gameData.worldWidth + 'px')

        @distances_px = {}
        for distKey of @distances
            @distances_px[distKey] = (@distances[distKey] + @dist_adjustments[distKey]) / gameData.worldWidth_AU * gameData.worldWidth

        console.log('distances:', @distances)

    getDistance: (landmarkKey, units)->
        if units=='AU'
            return @distances[landmarkKey]
        else
            return @distances_px[landmarkKey]

    preload_backgrounds: (game)->
        game.load.image('filler', util.absPath('assets/backgrounds/filler.png'));
        game.load.image('moon', util.absPath('assets/backgrounds/moon.png'));
        game.load.image('earth', util.absPath('assets/backgrounds/bg.png'));
        game.load.image('mars', util.absPath('assets/backgrounds/mars.png'));
        game.load.image('ceres', util.absPath('assets/backgrounds/ceres.png'));
        game.load.image('jupiter', util.absPath('assets/backgrounds/jupiter.png'));
        game.load.image('europa', util.absPath('assets/backgrounds/europa.png'));