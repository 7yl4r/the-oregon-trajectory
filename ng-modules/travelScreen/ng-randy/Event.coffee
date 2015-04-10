module.exports = class Event
    TRIGGER_ACTIONS =
        switchModule: "switchToModule"
        alert: "alert"

    constructor: (eventJSON, $scope)->
        @type = eventJSON.type
        @name = eventJSON.name
        @criteria = eventJSON.criteria
        @chance = eventJSON.chance
        @count = 0  # number of times event has triggered
        @setTriggerFunction(eventJSON.triggeredAction)  # sets @doAction function
        @scope = $scope

    setTriggerFunction: (actionJSON)->
        # converts given json function & args description into actual function which is assigned to @doAction
        # :returns: true if action is set, false if not
        if actionJSON?
            func = actionJSON.function
            args = actionJSON.args
            switch func
                when TRIGGER_ACTIONS.switchModule
                    @doAction = ()=>
                        @scope.$emit('switchToModule', args.moduleName)
                when TRIGGER_ACTIONS.alert
                    @doAction = ()=>
                        alert(args.text)
            return true
        else
            return false

    trigger: ()->
        @count += 1
        @scope.$broadcast(@type, @)