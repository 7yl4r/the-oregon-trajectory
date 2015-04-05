# TODO: handle sprites here
module.exports = class Location
    constructor: (name, x, actionKey)->
        @name = name
        @x = x
        @actionKey = actionKey

    trigger: (args)->
        switch @actionKey
            when "station"
                @_handleStationArrival(args)

    _handleStationArrival: (args)->
        # TODO: station-specific stuff like
        # switch @name
        #   when "iss"
        #       # something...
        #   when "moon"
        #       # something else...
        args.$scope.$emit('switchToModule', 'shop');
