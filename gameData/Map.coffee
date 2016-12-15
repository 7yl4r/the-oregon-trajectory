LANDMARKS = require('./earth-europa-trajectory.js').LANDMARK

module.exports = class Map
    constructor: (gameData)->
        # nada

    getLocation: (gameData, locKey)->
        for index of gameData.trajectory.locations
            if gameData.trajectory.locations[index].key == locKey
                return gameData.trajectory.locations[index]

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
