module.exports = class Event
    constructor: (eventJSON, $scope)->
        @type = eventJSON.type
        @name = eventJSON.name
        @criteria = eventJSON.criteria
        @chance = eventJSON.chance
        @args = eventJSON.args
        @count = 0  # number of times event has triggered
        @scope = $scope

    trigger: ()->
        @count += 1
        @scope.$broadcast(@type, {"name":@name, "count":@count, "args":@args})