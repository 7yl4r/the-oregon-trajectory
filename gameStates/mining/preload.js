module.exports = function() {  // preload function
  globalData.game.load.image('a-small', globalData.baseUrl+'assets/sprites/asteroids/p0-small.png');
  globalData.game.load.image('space', globalData.baseUrl+'assets/backgrounds/milky_way_bg.png');
  globalData.game.load.image('bullet', 'http://examples.phaser.io/assets/games/asteroids/bullets.png');
  globalData.game.load.image('ship', globalData.baseUrl+'assets/sprites/ship.png');
  globalData.game.load.image('asteroid', globalData.baseUrl+'assets/sprites/asteroids/0.png');

  // NOTE: these audio snippets are duplicates of those already loaded in game.sounds (and we could use those instead)
  globalData.game.load.audio('shot1',
      [
          'assets/sound/effects/shot1/shot1.mp3',
          'assets/sound/effects/shot1/shot1.ogg',
          'assets/sound/effects/shot1/shot1.wav'
      ]
  );
  globalData.game.load.audio('shot2',
      [
          'assets/sound/effects/shot2/shot2.mp3',
          'assets/sound/effects/shot2/shot2.ogg'
      ]
  );
  globalData.game.load.audio('clunk',
    [
        'assets/sound/effects/clunk/clunk.mp3',
        'assets/sound/effects/clunk/clunk.ogg',
        'assets/sound/effects/clunk/clunk.wav'
    ]
  );
  globalData.game.load.audio('propel',
      [
          'assets/sound/effects/propellant/propellant.mp3',
          'assets/sound/effects/propellant/propellant.ogg',
          'assets/sound/effects/propellant/propellant.wav'
      ]
  );


  // load phaser plugins
  require('slick-ui-preload')();

  require('pause-button').preload(globalData.game)
}
