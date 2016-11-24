module.exports = function() {  // create function
  globalData.bulletTime = 0;
  globalData.stats = {
    main_fuel: 0,
    secondary_fuel: 0,
    bullets: 0,
    parts: 0,
    crash: false,
    fuel: 0,
    credits: 0
  }

  var w=globalData.game.width;
  var h=globalData.game.height;
  var rnd=globalData.game.rnd.integerInRange.bind(globalData.game.rnd);

  //  This will run in Canvas mode, so let's gain a little speed and display
  globalData.game.renderer.clearBeforeRender = false;
  globalData.game.renderer.roundPixels = true;

  //  We need arcade physics
  globalData.game.physics.startSystem(Phaser.Physics.ARCADE);

  //  A spacey background
  globalData.game.add.tileSprite(0, 0, globalData.game.width, globalData.game.height, 'space');

  //  Our ships bullets
  globalData.bullets = globalData.game.add.group();
  globalData.bullets.enableBody = true;
  globalData.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  globalData.bullets.createMultiple(40, 'bullet');
  globalData.bullets.setAll('anchor.x', 0.5);
  globalData.bullets.setAll('anchor.y', 0.5);

  // our asteroid particles
  globalData.parts = globalData.game.add.group();
  globalData.parts.enableBody = true;
  globalData.parts.physicsBodyType = Phaser.Physics.ARCADE;
  globalData.parts.createMultiple(60, 'a-small');
  globalData.parts.setAll('anchor.x', 0.5);
  globalData.parts.setAll('anchor.y', 0.5);

  //  Our player ship
  globalData.sprite = globalData.game.add.sprite(
    rnd(w/10.0, w/3.0),
    rnd(h/10.0, h*9/10.0),
    'ship');
  globalData.sprite.anchor.set(3.0/5.0, 0.5);
  globalData.sprite.scale.set(0.25, 0.25);
  globalData.game.physics.enable(globalData.sprite, Phaser.Physics.ARCADE);
  globalData.sprite.body.maxVelocity.set(200);
  globalData.sprite.rotation = globalData.game.physics.arcade.moveToXY(globalData.sprite, w,
    rnd(h/10.0, h*9/10.00),
    rnd(w/60.0, w/90.0));

  // the asteroid
  globalData.asteroidSize = 0.5;// globalData.encounter_object.sprite.scale;  // 0.5;
  globalData.ASTEROID_SHRINK = 0.005;  // amount asteroid decreases in size with each hit
  globalData.asteroid = globalData.game.add.sprite(
    rnd(w*2/3.0, w*9/10.0),
    rnd(h/10.0, h*9/10.0),
    'asteroid');
  globalData.asteroid.anchor.set(0.5, 0.5);
  globalData.asteroid.scale.set(globalData.asteroidSize, globalData.asteroidSize);
  globalData.asteroid.rotateAngle = globalData.game.rnd.realInRange(-2, 2);
  globalData.game.physics.enable(globalData.asteroid, Phaser.Physics.ARCADE);
  globalData.game.physics.arcade.moveToXY(globalData.asteroid, 0,
    rnd(h/10.0, h*9/10.00),
    rnd(w/60.0, w/90.0));

  // asteroids
  globalData.asteroids = globalData.game.add.group();
  // globalData.asteroids.enableBody = true;
  // globalData.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
  // globalData.createAsteroids();

  //  Game input
  globalData.cursors = globalData.game.input.keyboard.createCursorKeys();
  globalData.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

  require('pause-button').create(globalData.game)
}
