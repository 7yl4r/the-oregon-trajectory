PauseButton = require('pause-button');

game_over = function(game){
    console.log('starting game state : game-over')
}

game_over.prototype = {
    preload: function() {
        console.log('game-over screen preloading...')

        // load phaser plugins
        require('slick-ui-preload')();
        PauseButton.preload(this.game)
    },
    create: function() {
        PauseButton.create(this.game);
        settings = globalData.gameData.UISettings;

        // LEFT PANEL
        game.slickUI.add(mainTextPanel = new SlickUI.Element.Panel(
            settings.pad,
            settings.middlePanelTop,
            settings.leftPanelW,
            settings.middlePanelH
        ));
        mainTextPanel.add(endgameText = new SlickUI.Element.Text(
            settings.pad, // 40 for est text width
            settings.pad,
            'you have died of space-dysentery.'
        ));
    }
}

module.exports = game_over
