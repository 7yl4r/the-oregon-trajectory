# reputation class which holds reputations with unlimited number of factions indexed name
# reputations modified using built-in methods, retrieved using getRepWith('name')
# reputations with each faction represented in range -1 to 1,
# -1 being shoot-on-site, and +1 being worship-on-site
# methods should be written as such that annoying a particular faction many times is unlikely to drive them to war
#  with you, i.e. escalation should not be linear.

FactionRep = require("./FactionRep.coffee")

module.exports = class Reputation

    constructor: ()->
        @_reputations = {}

    annoy: (factionName)->
        # slightly annoys the given faction
        @_checkFaction(factionName)
        @_reputations[factionName].annoy()

    beNeutral: (factionName)->
        @_checkFaction(factionName)
        @_reputations[factionName].beNeutral()

    help: (factionName)->
        @_checkFaction(factionName)
        @_reputations[factionName].help()

    getAllReputationValues: ()->
        # returns array of reputation values (between -1, 1)
        values = []
        for reputation in @_reputations
            values.push(getRepWith(reputation.getRep()))
        return values

    getRepWith: (factionName)->
        # returns reputation value for given faction.
        # value between (-1, 1)
        @_checkFaction(factionName)
        return @_reputations[factionName].getRep()

    _checkFaction: (factionName)->
        # enusures rep with given faction is inititialized
        if @_reputations[factionName]?
            return
        else
            @_reputations[factionName] = new FactionRep()
