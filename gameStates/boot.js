boot = function(game){
    console.log('starting game state : boot')
}

boot.prototype = {
    preload: function() {
        console.log('boot screen preloading...')

        this.game.load.image('diamond', 'assets/sprites/advice/frustrated.png');

        // load menu assets
        this.game.load.image('pause-menu', 'assets/menus/pause.png');
        this.game.load.image('main-menu', 'assets/menus/main.png');

        // load phaser plugins
        SlickUI = require('slick-ui');
        globalData.game.slickUI = globalData.game.plugins.add(Phaser.Plugin.SlickUI);
        globalData.game.slickUI.load(util.absPath('assets/ui/kenney/kenney.json'));

    },
    create: function() {
        /*
            Eye candy code from example diamond burst:
        */
        // this.game.stage.backgroundColor = '#337799';
        emitter = this.game.add.emitter(this.game.world.centerX, 100, 200);
        emitter.makeParticles('diamond');
        emitter.start(false, 5000, 20);

        // demo pause menu functionality using label as button:
        pause_label = this.game.add.text(
            this.game.width - 100,
            20,
            'Pause',
            { font: '24px Arial', fill: '#fff' }
        );
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(require('pause'), self);


        // main menu setup:
        menu = this.game.add.sprite(
            this.game.width/2,
            this.game.height/2,
            'main-menu'
        );
        menu.anchor.setTo(0.5, 0.5);



        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = this.game.add.text(
            this.game.width/2,
            this.game.height-150,
            'Click outside menu to continue',
            { font: '30px Arial', fill: '#fff' }
        );
        choiseLabel.anchor.setTo(0.5, 0.5);

        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(require('main-menu-controller'), this);
    }
}

module.exports = boot
