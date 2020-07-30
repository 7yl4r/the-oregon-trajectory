PauseButton = require('pause-button');  // Could use '../../gameUI/addPauseButton.js'
StatusDisplay = require('status-display');
drift = require('drift');

module.exports = function(){
    console.log('create travelScreen');
    this.randyTime = 0;

    this.tileGroup = this.game.add.group();
    this.tileGroup.classType = Phaser.Image;
    // this.tileGroup.setAll('outOfBoundsKill', true);
    // this.tileGroup.setAll('checkWorldBounds', true);
    this.shownTileKeys = [];

    updateBackgroundTiles(this);

    this.SHIP_INITIAL_POS = 0;
    this.ship = this.game.add.sprite(
        this.SHIP_INITIAL_POS,
        this.game.height/2,
        'player-ship'
    );
    this.ship.anchor.setTo(0.5, 0.5);
    this.ship.update = function(){
        this.y = drift(this.y)
    }
    this.game.world.setBounds(-200, 0, globalData.gameData.worldWidth, 600);
    this.game.camera.follow(this.ship);

    this.tileGroup.x = globalData.gameData.distanceTraveled;
    window.travelScreen = this;

    PauseButton.create(this.game);
    StatusDisplay.create(this.game);

    globalData.gameData.eventManager.on("encounter", (function(gameState){
        return function(event){
            // TODO: handle encounter
            var eventSprite = gameState.game.add.sprite(
                gameState.game.camera.x + gameState.game.width,
                gameState.game.height/2,
                'satelite-debris-1'
            );
            console.log('encounter:', event, 'sprite:', eventSprite);
        }
    })(this));
}
