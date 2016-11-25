boot = function(game){
    console.log('starting game state : boot')
}

boot.prototype = {
    preload: function() {
        console.log('boot screen preloading...')

        this.game.load.image('diamond', 'assets/sprites/advice/frustrated.png');
        this.game.load.image('main-menu', 'assets/menus/main.png');

        // load phaser plugins
        require('slick-ui-preload')();
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
    }
}

module.exports = boot
