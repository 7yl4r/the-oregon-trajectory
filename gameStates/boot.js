boot = function(game){
    console.log('starting game state : boot')
}

boot.prototype = {
    preload: function() {
        console.log('boot screen preloading...')

        this.game.load.image('diamond', 'assets/sprites/advice/frustrated.png');
        this.game.load.image('main-menu', 'assets/menus/main.png');

        // load phaser plugins
        SlickUI = require('slick-ui');
        globalData.game.slickUI = globalData.game.plugins.add(Phaser.Plugin.SlickUI);
        globalData.game.slickUI.load(util.absPath('assets/ui/kenney/kenney.json'));

        require('pause-button').preload(this.game)
    },
    create: function() {
        // main menu setup:
        menu = this.game.add.sprite(
            this.game.width/2,
            this.game.height/2,
            'main-menu'
        );
        menu.anchor.setTo(0.5, 0.5);

        this.game.input.onDown.add(require('main-menu-controller'), this);

        require('pause-button').create(this.game)
    }
}

module.exports = boot
