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
        this.game.load.image('pause-button', 'assets/ui/pause-button.png');

        // load phaser plugins
        SlickUI = require('slick-ui');
        globalData.game.slickUI = globalData.game.plugins.add(Phaser.Plugin.SlickUI);
        globalData.game.slickUI.load(util.absPath('assets/ui/kenney/kenney.json'));

    },
    create: function() {
        /*
            Eye candy code from example diamond burst:
        */
        //
        emitter = this.game.add.emitter(this.game.world.centerX, 100, 200);
        emitter.makeParticles('diamond');
        emitter.start(false, 5000, 20);

        // ####################################################
        // demo pause menu functionality using label as button:
        // ####################################################
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


        // ####################################################
        //  slick UI demo pause menu
        // ####################################################

        SlickUI = require('slick-ui');
        var button, panel, menuButton;
        this.game.slickUI.add(panel = new SlickUI.Element.Panel(this.game.width - 156, 8, 150, this.game.height - 16));
        panel.add(new SlickUI.Element.Text(10,0, "Menu")).centerHorizontally().text.alpha = 0.5;
        panel.add(button = new SlickUI.Element.Button(0,this.game.height - 166, 140, 80)).events.onInputUp.add(function () {
            console.log('Clicked save game');
        });

        button.add(new SlickUI.Element.Text(0,0, "Save game")).center();

        panel.add(button = new SlickUI.Element.Button(0,this.game.height - 76, 140, 40));
        button.add(new SlickUI.Element.Text(0,0, "Close")).center();

        panel.visible = false;
        var basePosition = panel.x;

        this.game.slickUI.add(menuButton = new SlickUI.Element.DisplayObject(
            this.game.width - (64 + 8),
            8,
            this.game.make.sprite(0, 0, 'pause-button')
        ));
        menuButton.inputEnabled = true;
        menuButton.input.useHandCursor = true;
        menuButton.events.onInputDown.add(function () {
            if(panel.visible) {
                return;
            }
            panel.visible = true;
            panel.x = basePosition + 156;
            globalData.game.add.tween(panel).to( {x: basePosition}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                menuButton.visible = false;
            });
            globalData.game.slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
        }, this);

        button.events.onInputUp.add(function () {
            globalData.game.add.tween(panel).to( {x: basePosition + 156}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                panel.visible = false;
                panel.x -= 156;
            });
            menuButton.visible = true;
        });

        var cb1, cb2;
        panel.add(cb1 = new SlickUI.Element.Checkbox(0,100, SlickUI.Element.Checkbox.TYPE_RADIO));
        cb1.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb2.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb1.checked = true;
            }
        }, this);

        panel.add(cb2 = new SlickUI.Element.Checkbox(50,100, SlickUI.Element.Checkbox.TYPE_RADIO));
        cb2.events.onInputDown.add(function () {
            if(cb1.checked && cb2.checked) {
                cb1.checked = false;
            }
            if(!cb1.checked && !cb2.checked) {
                cb2.checked = true;
            }
        }, this);

        panel.add(new SlickUI.Element.Checkbox(100,100));

    }
}

module.exports = boot
