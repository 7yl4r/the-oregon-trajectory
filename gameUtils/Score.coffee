REPUTATION_CONVERSION = 100  # reputation-to-score conversion factor
HEALTH_CONVERSION = 1000  # crewmember health to score conversion factor
SPACECOIN_CONVERSION = 1/10  # spacecoin to score conversion factor
DISTANCE_CONVERSION = 1000  # number of digits in distance (km) to score conversion factor

module.exports = class Score
    constructor: ()->
        @totalScore =
        @repuationScore =
        @healthScore =
        @wealthScore =
        @distanceScore =
        @bonusScore = 0

    _recalcScore: ()->
        @totalScore = @reputationScore + @healthScore + @wealthScore + @bonusScore + @distanceScore

    updateScore: (distance, reputation, shipHealth, spaceCoin, rations, fuel, ship)->
        @updateReputationScore(reputation)
        @updateHealthScore(shipHealth)
        @updateWealthScore(spaceCoin, rations, fuel, ship)
        @updateDistanceScore(distance)

    updateDistanceScore: (distance)->
        @distanceScore = Math.round(distance.toString().length * DISTANCE_CONVERSION)
        @_recalcScore()

    updateReputationScore: (reputation)->
        @reputationScore = 0
        for rep in reputation.getAllReputationValues()
            @reputationScore += rep * REPUTATION_CONVERSION
        @reputationScore = Math.round(@reputationScore)
        @_recalcScore()

    updateHealthScore: (shipHealth)->
        # TODO: update this to use more advanced shipHealth (oh yeah, and also write more advanced shipHealth class)
        @healthScore = (shipHealth-1) * HEALTH_CONVERSION
        if @healthScore < 0
            healthScore = 0
        @healthScore = Math.round(@healthScore)
        @_recalcScore()

    updateWealthScore: (spaceCoin, rations, fuel, ship)->
        # TODO: handle ship upgrades (and other resources?)
        # NOTE: this score assumes that rations and fuel both cost 1 spaceCoin
        @wealthScore = (rations + fuel + spaceCoin) * SPACECOIN_CONVERSION
        @wealthScore = Math.round(@wealthScore)
        @_recalcScore()

    addBonus: (points)->
        @bonusScore += points
        @_recalcScore()
