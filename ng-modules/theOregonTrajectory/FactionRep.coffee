module.exports = class FactionRep
    ASY = 2/Math.PI  # to scale the atan functions (include before maxes)
    CONV = 1/3  # convergence factor (to prevent values from approaching max too quickly)

    ANNOYANCE_MAX = ASY * .4
    HELPS_MAX = ASY * .6

    constructor: (initCounts)->
        # initCounts (optional): event counts object to set initial rep
        if not initCounts?
            initCounts = {}

        # count of number of events in past
        @event_counts = {
            annoyances: initCounts.annoyances or 0
            neutrals: initCounts.neutrals or 0
            helps: initCounts.helps or 0
        }

        # individual sensitivity to each event for this faction (>1 is more sensitive, 0<x<1 is less sensitive)
        # should remain constant once set
        @sensitivity = {
            annoyances: 1 * CONV
            helps:      1 * CONV
        }

        @repValue = 0
        @_dirty = true  # true if needs recalc

    annoy: ()->
        @event_counts.annoyances += 1
        @_dirty = true

    beNeutral: ()->
        @event_counts.neutrals += 1
        @_dirty = true

    help: ()->
        @event_counts.helps += 1
        @_dirty = true

    getRep: ()->
        if @_dirty
            @_recalcRep()

        return @repValue

    _getEventCount: ()->
        # returns sum of all events
        return (
            @event_counts.annoyances +
            @event_counts.neutrals +
            @event_counts.helps
        )

    _recalcRep: ()->
        # recalculates reputation based on counts
        # repeated events contribute less with each repetition up to a max using atan, then weighted average computes repValue
        annoyRep   = -Math.atan(@event_counts.annoyances * @sensitivity.annoyances) * ANNOYANCE_MAX
        helpRep    =  Math.atan(@event_counts.helps      * @sensitivity.helps     ) * HELPS_MAX
        neutralRep = 0

        total = @_getEventCount()
        if total != 0
            @repValue = (
                    annoyRep  * @event_counts.annoyances +
                    neutralRep* @event_counts.neutrals +
                    helpRep   * @event_counts.helps
            ) / (
                total
            )
        else
            return 0

        @_dirty = false