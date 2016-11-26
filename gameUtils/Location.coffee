Sprite = require('./Sprite.coffee')
drift = require('drift')

module.exports = class Location
    constructor: (name, x, actionKey, trigger=undefined, sprite=undefined)->
        # console.log('new Loc(', name, x, actionKey, '):', this)
        @name = name
        @x = x
        @actionKey = actionKey  # TODO: remove actionKey (use trigger and sprite instead)
        if sprite?
            @sprite = sprite
        else
            @sprite = @_getSpriteForAction(actionKey)

        if trigger?
            @trigger = trigger
        # else just logs

    trigger: (args)->
        console.log('arrived at event', @)
        console.log('loc trigged w/ args: ', args)
        # @addLocationSprite(args.state, args.data, @)

    # TODO: remove this method and actionKey attribute, sprites should be passed inTo the location now...
    _getSpriteForAction: (key)->
        switch key
            when "station"
                return new Sprite('assets/stations/marker1/spritesheet.png',
                    "station1", -1000, 'random')
            when "maneuver"
                return new Sprite('assets/sprites/maneuver-node/sprites.png',
                    "maneuver-node", -1000, 300);

            else
                return new Sprite('assets/sprites/spec.png', {w:3, h:3}, 0, "random");

    addLocationSprite: (gameState, data, location)->
        # draws location sprite if in view at global Xposition
        # if w/in reasonable draw distance
        game = gameState.game;

        # TODO: add rotation
        location.sprite = game.add.sprite(
            location.x + gameState.SHIP_INITIAL_POS,
            drift(game.height/2),
            'player-ship'
        );
        location.sprite.anchor.setTo(0.5, 0.5);
        location.sprite.update = ()->
            this.y = drift(this.y)


        # console.log('sprite added for ', location);
        window.currentLocation = location;
