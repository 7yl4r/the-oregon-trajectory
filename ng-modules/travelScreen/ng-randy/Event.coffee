module.exports = class Event
    constructor: (eventJSON, $scope)->
        @type = eventJSON.type
        @name = eventJSON.name
        @criteria = eventJSON.criteria
        @chance = eventJSON.chance
        @data = eventJSON.args
        @count = 0  # number of times event has triggered
        @scope = $scope

    trigger: ()->
        @count += 1
        console.log(@type, ':', @name, ' triggered')
        @scope.$broadcast(@type, [name, data])
# or should this be $emit?