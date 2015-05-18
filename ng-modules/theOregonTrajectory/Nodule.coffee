module.exports = class Nodule
    constructor: ($rootScope, noduleName, onEntry, onExit)->
        @scope = $rootScope
        @name = noduleName
        if onEntry?
            @onEntry = onEntry
        if onExit?
            @onExit = onExit
        @isActive = false

        @scope.$on('switchToModule', (event, nextModule, args...)=>
            if not @isActive
                if nextModule == @name  # if switching to this module
                    @isActive = true
                    @onEntry args...
            else
                # switching from this module to another
                @isActive = false
                @onExit()
        )


    # mock functions for optional constructor args
    onEntry: ()->
        return
    onExit: ()->
        return
