Sprite = require('../Sprite.coffee')

module.exports = class Event
    TRIGGER_ACTIONS =
        switchModule: "switchToModule"
        alert: "alert"

    # procedural sprite types
    SPRITE_TYPES =
        randomDebris: "randomDebris"
        randomStation: "randomStation"
        randomAsteroid: "randomAsteroid"

    constructor: (eventJSON, $scope)->
        @scope = $scope
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
                when TRIGGER_ACTIONS.switchModule
                    @doAction = ()=>
                        @scope.$emit('switchToModule', args.moduleName, args.moduleArgs)
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
                if Math.random() < .05  # 5% chance of potato asteroid
                    fname = 'assets/sprites/asteroids/p0.png'
                    dimensions = {
                        w:149,
                        h:185,
                    }
                else
                    n_asteroids = 26.0  # actual count is this +1
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
                                w:642,
                                h:632
                            }
                            fname = 'assets/sprites/asteroids/1.png'
                        when 2
                            dimensions = {
                                w: 353,
                                h: 226
                            }
                        when 3
                            dimensions = {
                                w:402,
                                h:303
                            }
                        when 4
                            dimensions = {
                                w: 99,
                                h: 65
                            }
                        when 5
                            dimensions = {
                                w: 216,
                                h: 178
                            }
                        when 6
                            dimensions = {
                                w: 832
                                h: 432
                            }
                        when 7
                            dimensions = {
                                w: 800,
                                h: 465
                            }
                        when 8
                            dimensions = {
                                w:507,
                                h:400
                            }
                        when 9
                            dimensions = {
                                w:926,
                                h: 400
                            }
                        when 10
                            dimensions = {
                                w:1011,
                                h: 400
                            }
                        when 11
                            dimensions = {
                                w: 834,
                                h: 400
                            }
                        when 12
                            dimensions = {
                                w: 529
                                h: 400
                            }
                        when 13
                            dimensions = {
                                w: 922,
                                h: 489
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
                                w: 12,
                                h: 12
                            }
                        when 28
                            dimensions = {
                                w:21,
                                h:21
                            }
                        when 29
                            dimensions = {
                                w:30,
                                h:31
                            }
                        when 30
                            dimensions = {
                                w:55,
                                h:53
                            }
                        when 31
                            dimensions = {
                                w:48,
                                h:42
                            }
                        when 32
                            dimensions = {
                                w: 18,
                                h: 26
                            }

                dimensions.r = "random"
                dimensions.scale = "random"
                dimensions.spin = "random"
                return new Sprite(fname, dimensions, -1000, 'random')

            else
                return new Sprite('assets/sprites/spec.png', {w:3,h:3,r:0,scale:1}, -1000, 'random')

    trigger: ()->
        @count += 1
        @scope.$broadcast("encounter", @)
        @sprite = @getSprite(@spriteKey)  # re-get sprite to re-randomize
