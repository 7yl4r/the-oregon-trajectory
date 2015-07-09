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
                    n_asteroids = 2.0  # +1
                    n = Math.round(Math.random()*n_asteroids)
                    switch n
                        when 0
                            dimensions = {
                                w:400,
                                h:300
                            }
                            fname = 'assets/sprites/asteroids/0.png'
                        when 1
                            dimensions = {
                                w:642,
                                h:632
                            }
                            fname = 'assets/sprites/asteroids/1.png'
                        when 2
                            dimensions = {
                                w:432,
                                h:432,
                                max_frame: 12
                            }
                            fname = 'assets/sprites/asteroids/rosetta/sprites.png'
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
