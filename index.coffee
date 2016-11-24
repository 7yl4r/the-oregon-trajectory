require('phaser')

# show warning before navigating from the page
window.onbeforeunload = () ->
    return 'You will lose your progress!'

window.fillVersionSpans = () ->
    $('.version-number').text(globalData.version)

window.globalData = {
    gameDir:'',
    baseUrl:(if location.host == '7yl4r.github.io' then '/the-oregon-trajectory/' else '/')
    engineDelay: 100, # ms of delay for engine shutdown (sound only)
    lastEngineFire: 0,
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

$(document).ready( ()->

    # version number display
    version = '0.0.0';
    $.get(globalData.gameDir+'/package.json', {}, (data, textStatus, jqXHR)->
        globalData.version = data.version
        window.fillVersionSpans()
    , 'json');

    globalData.game = new Phaser.Game(800, 600, Phaser.CANVAS,
        'game-container-div',
        {
            preload: require('phaser-preload'),
            create: require('phaser-create'),
            update: require('phaser-update'),
            render: require('phaser-render')
        }
    );

    # game volume mute
    # globalData.game.sound.mute = false;
)
