drift = require('drift')

module.exports = class Location
    constructor: (name, x, spriteKey=undefined, trigger=undefined)->
        # console.log('new Loc(', name, x, actionKey, '):', this)
        @name = name
        @x = x
        @spriteKey = spriteKey

        if trigger?
            @trigger = trigger

        if spriteKey?
            @spriteKey = spriteKey
        else
            @spriteKey = name

    trigger: (args)->
        console.log('arrived at event', @)
        console.log('loc trigged w/ args: ', args)

    addLocationSprite: (gameState, data, location)->
        # draws location sprite if in view at global Xposition
        # if w/in reasonable draw distance
        game = gameState.game;

        # TODO: add rotation
        location.sprite = game.add.sprite(
            location.x + gameState.SHIP_INITIAL_POS,
            drift(game.height/2),
            @spriteKey
        );
        location.sprite.animations.add('animation1');
        location.sprite.animations.play('animation1', 2, true);
        location.sprite.anchor.setTo(0.5, 0.5);
        location.sprite.update = ()->
            this.y = drift(this.y)


        # console.log('sprite added for ', location);
        window.currentLocation = location;
