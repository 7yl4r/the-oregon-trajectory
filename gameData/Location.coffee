drift = require('drift')

class Location
    # constructor: (name, x, spriteKey=undefined, trigger=undefined)->
    #     # console.log('new Loc(', name, x, actionKey, '):', this)
    #     @name = name
    #     @x = x
    #     @spriteKey = spriteKey
    #
    #     if trigger?
    #         @trigger = trigger
    #
    #     if spriteKey?
    #         @spriteKey = spriteKey
    #     else
    #         @spriteKey = name
    constructor: (locJSON, trigger=undefined)->
        # console.log('new Loc(', name, x, actionKey, '):', this)
        @name = locJSON.name
        @x = locJSON.distance_px
        @spriteKey = locJSON.key

        if trigger?
            @trigger = trigger

    trigger: (args)->
        console.log('arrived at event', @)
        console.log('loc trigged w/ args: ', args)

    addLocationSprite: (gameState, data, location)->
        # draws location sprite if in view at global Xposition
        # if w/in reasonable draw distance
        game = gameState.game;

        # TODO: add rotation
        try
            location.sprite = game.add.sprite(
                location.distance + gameState.SHIP_INITIAL_POS,
                drift(game.height/2),
                @spriteKey
            );
            location.sprite.animations.add('animation1');
            location.sprite.animations.play('animation1', 2, true);
            location.sprite.anchor.setTo(0.5, 0.5);
            location.sprite.update = ()->
                this.y = drift(this.y)
        catch error  # probably spriteKey not found
            console.warn(error)


        # console.log('sprite added for ', location);
        # window.currentLocation = location;

buildLocation = (locJSON, gameData)->
    # location builder
    trig = ()->
        console.log('trigger ', locJSON.name)

    # console.log('build', locJSON)
    return new Location(locJSON, trigger=trig)

module.exports = { Location: Location, buildLocation: buildLocation }
