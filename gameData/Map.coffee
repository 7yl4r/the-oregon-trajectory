Location = require('./Location.coffee').Location
buildLocation = require('./Location.coffee').buildLocation
LANDMARKS = require('./earth-europa-trajectory.js').LANDMARK

#// TODO: move this...
shopFunc = ()->
    globalData.game.state.start('shop');
    console.log('switch to shop');

winFunc = ()->
    #// TODO:
    console.log('switch to win state');

module.exports = class Map
    constructor: (gameData)->
        @setTravelTime(5, gameData)

        for locKey of gameData.trajectory.locations
            gameData.trajectory.locations[locKey].locObj = buildLocation(
                gameData.trajectory.locations[locKey],
                gameData
            )

    getLocation: (gameData, locKey)->
        for index of gameData.trajectory.locations
            if gameData.trajectory.locations[index].key == locKey
                return gameData.trajectory.locations[index]

    setTravelTime: (gameLength, gameData)->
        # sets game targeted length in minutes and adjusts distances between
        #   planets accordingly.
        gameTime = gameLength*60 # convert to seconds
        fps = 30
        gameData.worldWidth = gameTime*TRAVEL_SPEED*fps  # [s] * [px]/[s] = [px]

        console.log('gameTime set to ' + gameLength + 'min. Width:' + gameData.worldWidth + 'px')

        for locKey of gameData.trajectory.locations
            loc = gameData.trajectory.locations[locKey]
            loc.distance_px = (loc.distance + loc.distance_adj) / gameData.worldWidth_AU * gameData.worldWidth

        window.traj = gameData.trajectory  # TODO: remove this debug code
        # @distances_px = {}
        # for distKey of @distances
        #     @distances_px[distKey] = (@distances[distKey] + @dist_adjustments[distKey]) / gameData.worldWidth_AU * gameData.worldWidth

        # console.log('distances:', @distances)

    getDistance: (landmarkKey, units)->
        if units=='AU'
            return @getLocation(globalData.gameData, landmarkKey).distance
        else
            return @getLocation(globalData.gameData, landmarkKey).distance_px

    preload_backgrounds: (game)->
        game.load.image('filler', util.absPath('assets/backgrounds/filler.png'));
        game.load.image('moon', util.absPath('assets/backgrounds/moon.png'));
        game.load.image('earth', util.absPath('assets/backgrounds/bg.png'));
        game.load.image('mars', util.absPath('assets/backgrounds/mars.png'));
        game.load.image('ceres', util.absPath('assets/backgrounds/ceres.png'));
        game.load.image('jupiter', util.absPath('assets/backgrounds/jupiter.png'));
        game.load.image('europa', util.absPath('assets/backgrounds/europa.png'));
