module.exports = class Event
    TRIGGER_ACTIONS =
        alert: "alert"

    constructor: (eventJSON)->
        @name = eventJSON.name
        @criteria = eventJSON.criteria
        @chance = eventJSON.chance
        @count = 0  # number of times event has triggered
        @setTriggerFunction(eventJSON.triggeredAction)  # sets @doAction function

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

    trigger: ()->
        @count += 1
        # console.log('triggered.')
        # $(document).trigger("encounter", @)  // TODO: re-enable
