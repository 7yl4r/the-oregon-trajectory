Sprite = require('../../gameData/Sprite.coffee')

module.exports = class Event
    TRIGGER_ACTIONS =
        alert: "alert"

    # procedural sprite types
    SPRITE_TYPES =
        randomDebris: "randomDebris"
        randomStation: "randomStation"
        randomAsteroid: "randomAsteroid"

    constructor: (eventJSON)->
        @name = eventJSON.name
        @criteria = eventJSON.criteria
        @chance = eventJSON.chance
        @count = 0  # number of times event has triggered
        @setTriggerFunction(eventJSON.triggeredAction)  # sets @doAction function
        @sprite = @getSprite(eventJSON.sprite)

    setTriggerFunction: (actionJSON)->
        # converts given json function & args description into actual function which is assigned to @doAction
        # :returns: true if action is set, false if not
        if typeof actionJSON == 'object'
            func = actionJSON.function
            args = actionJSON.args
            switch func
                when TRIGGER_ACTIONS.alert
                    @doAction = ()=>
                        alert(args.text)
            return true
        else if typeof actionJSON == 'function'
            @doAction = actionJSON
            return true
        else
            return false

    getSprite: (spriteKey)->
        # :returns: (random) sprite object of type specified
        #            OR just Sprite from given filename
        # TODO: move attributes set in sprite class using keys "station1, satelite-debris-1, etc, to here?
        @spriteKey = spriteKey  # save this for later
        switch spriteKey
            when SPRITE_TYPES.randomDebris
                return new Sprite('assets/sprites/debris-satellite.png',
                                  "satelite-debris-1", -1000, 'random');
            when SPRITE_TYPES.randomStation
                return new Sprite('assets/sprites/randomStation/' + Math.round(Math.random()*17.0) + '.png',
                    {
                        w:439,
                        h:400,
                        scale: "random",
                        r: "random",
                        spin: .001
                    },
                    -1000,
                    'random'
                )
            when SPRITE_TYPES.randomAsteroid
                n_asteroids = 33.0  # actual count is this +1
                n = Math.round(Math.random()*n_asteroids)
                fname = 'assets/sprites/asteroids/' + n + '.png'
                switch n
                    when 0
                        dimensions = {
                            w:400,
                            h:300
                        }
                    when 1
                        dimensions = {
                            w:400,
                            h:394
                        }
                        fname = 'assets/sprites/asteroids/1.png'
                    when 2
                        dimensions = {
                            w: 400,
                            h: 256
                        }
                    when 3
                        dimensions = {
                            w:402,
                            h:303
                        }
                    when 4
                        dimensions = {
                            w: 300,
                            h: 197
                        }
                    when 5
                        dimensions = {
                            w: 300,
                            h: 247
                        }
                    when 6
                        dimensions = {
                            w: 400,
                            h: 208
                        }
                    when 7
                        dimensions = {
                            w: 400,
                            h: 233
                        }
                    when 8
                        dimensions = {
                            w:400,
                            h:316
                        }
                    when 9
                        dimensions = {
                            w: 400,
                            h: 173
                        }
                    when 10
                        dimensions = {
                            w: 400,
                            h: 158
                        }
                    when 11
                        dimensions = {
                            w: 400,
                            h: 192
                        }
                    when 12
                        dimensions = {
                            w: 400
                            h: 302
                        }
                    when 13
                        dimensions = {
                            w: 400,
                            h: 212
                        }
                    when 14
                        dimensions = {
                            w:432,
                            h:432,
                            max_frame: 12
                        }
                        fname = 'assets/sprites/asteroids/rosetta/sprites.png'
                    when 15
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/01.png'
                    when 16
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/02.png'
                    when 17
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/03.png'
                    when 18
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/04.png'
                    when 19
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/05.png'
                    when 20
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/06.png'
                    when 21
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/07.png'
                    when 22
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/08.png'
                    when 23
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/09.png'
                    when 24
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/10.png'
                    when 25
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/11.png'
                    when 26
                        dimensions = {
                            w: 432,
                            h:432,
                        }
                        fname = 'assets/sprites/asteroids/rosetta/12.png'
                    when 27
                        dimensions = {
                            w: 300,
                            h: 300
                        }
                    when 28
                        dimensions = {
                            w:370,
                            h:370
                        }
                    when 29
                        dimensions = {
                            w:392,
                            h:405
                        }
                    when 30
                        dimensions = {
                            w:400,
                            h:385
                        }
                    when 31
                        dimensions = {
                            w:400,
                            h:350
                        }
                    when 32
                        dimensions = {
                            w: 208,
                            h: 300
                        }
                    when 33
                        fname = 'assets/sprites/asteroids/p0.png'  # POTATO!
                        dimensions = {
                            w:362,
                            h:450,
                        }

                dimensions.r = "random"
                dimensions.scale = "random"
                dimensions.spin = "random"
                return new Sprite(fname, dimensions, -1000, 'random')

            else
                return new Sprite('assets/sprites/spec.png', {w:3,h:3,r:0,scale:1}, -1000, 'random')

    trigger: ()->
        @count += 1
        $(document).trigger("encounter", @)
        @sprite = @getSprite(@spriteKey)  # re-get sprite to re-randomize
