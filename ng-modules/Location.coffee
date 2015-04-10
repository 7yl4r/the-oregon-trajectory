Sprite = require('./travelScreen/Sprite.coffee')

module.exports = class Location
    constructor: (name, x, actionKey, trigger=undefined, sprite=undefined)->
        @name = name
        @x = x
        @actionKey = actionKey
        if sprite?
            @sprite = sprite
        else
            @sprite = @_getSpriteForAction(actionKey)

        if trigger?
            @trigger = trigger
        # else just logs

    trigger: (args)->
        console.log('arrived at event', @)
        console.log('you really ought to set an event trigger for this location')

    _handleStationArrival: (args)->
        # TODO: station-specific stuff like
        # switch @name
        #   when "iss"
        #       # something...
        #   when "moon"
        #       # something else...
        args.$scope.$emit('switchToModule', 'shop')

    # TODO: remove this method and actionKey attribute, sprites should be passed inTo the location now...
    _getSpriteForAction: (key)->
        switch key
            when "station"
                return new Sprite('assets/sprites/station_sheet.png',
                    "station1", -1000, Math.random()*200+200)
            when "encounter"
                return new Sprite('assets/sprites/debris-satellite.png',
                    "satelite-debris-1", -1000, Math.random()*200+200);
            when "maneuver"
                return new Sprite('assets/sprites/maneuver-node/sprites.png',
                    "maneuver-node", -1000, 300);