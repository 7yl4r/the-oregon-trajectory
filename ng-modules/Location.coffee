Sprite = require('./travelScreen/Sprite.coffee')

module.exports = class Location
    constructor: (name, x, actionKey)->
        @name = name
        @x = x
        @actionKey = actionKey
        @sprite = @_getSpriteForAction(actionKey)

    trigger: (args)->
        switch @actionKey
            when "station"
                @_handleStationArrival(args)
            when "encounter"
                console.log('arrived at encounter', @)
                args.$scope.$emit('switchToModule', 'debris-encounter')

    _handleStationArrival: (args)->
        # TODO: station-specific stuff like
        # switch @name
        #   when "iss"
        #       # something...
        #   when "moon"
        #       # something else...
        args.$scope.$emit('switchToModule', 'shop')

    _getSpriteForAction: (key)->
        switch key
            when "station"
                return new Sprite('assets/sprites/station_sheet.png',
                    "station1", -1000, Math.random()*200+200)
            when "encounter"
                return new Sprite('assets/sprites/debris-satellite.png',
                    "satelite-debris-1", -1000, Math.random()*200+200);