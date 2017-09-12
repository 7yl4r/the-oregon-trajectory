require('phaser')

# show warning before navigating from the page
window.onbeforeunload = () ->
    return 'You will lose your progress!'

window.fillVersionSpans = () ->
    $('.version-number').text(globalData.version)

Game = require('game');

window.globalData = {
    gameDir:'', # TODO: fix duplicated on gameData
    baseUrl:(if location.host == '7yl4r.github.io' then '/the-oregon-trajectory/' else '/')
    w: 800,
    h: 600,
    engineDelay: 100, # ms of delay for engine shutdown (sound only)
    lastEngineFire: 0,
    inMenu: false,
    calcFuel: () ->
        return (
            globalData.game.fuel
            + globalData.stats.fuel
            - globalData.stats.main_fuel*globalData.game.miningFuelExpenseThrust
            - globalData.stats.secondary_fuel*globalData.game.miningFuelExpenseRotate
            - globalData.stats.bullets*globalData.game.miningFuelExpenseFiringBullet
        )
    ,
    calcCredits: () ->
        return globalData.game.money + globalData.stats.credits
};

window.util = {
    absPath: (path) ->
        # use this anywhere you need an absolute path to a file.
        #   pass path without preceeding / or ./
        return globalData.baseUrl+path
}

$(document).ready( ()->
    window.globalData.gameData = new Game()

    # version number display
    version = '0.0.0';
    $.get(globalData.gameDir+'/package.json', {}, (data, textStatus, jqXHR)->
        globalData.version = data.version
        window.fillVersionSpans()
    , 'json')

    globalData.game = new Phaser.Game(
        globalData.gameData.w,
        globalData.gameData.h,
        Phaser.CANVAS,
        'game-container-div'
    )

    # set up phaser game states
    globalData.game.state.add('boot', require('./gameStates/boot'))
    globalData.game.state.add('mining', require('./gameStates/mining/mining'))
    # globalData.game.state.add('ship-chooser', require('./gameStates/shipChooser'))
    globalData.game.state.add('travel-screen', require('./gameStates/travelScreen/travelScreen'))
    globalData.game.state.add('shop', require('./gameStates/shop'))
    globalData.game.state.add('game-over', require('./gameStates/game-over'))

    globalData.game.state.start('boot')  # change this to start directly into a state for testing

)
