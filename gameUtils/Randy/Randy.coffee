# Event engine for Phaser.js games.
# Conceptually similar to:
# https://github.com/7yl4r/eventsEngine/tree/master/EventsEngine
# Uses Jquery custom events and Phaser.js.
#
#                     ` ' @@@@@@@@# +.
#                 , @@@@@@@@@@@@@@@@@@@@@@`
#               + @@@@@@@@@@@@@@@@@@@@@@@@@@`
#             ; @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`
#            ' @@@@@@@@@@@@@@@@; @@@@@@@@@@@@@@@
#           @@@@@@@@@@@@@@@@@@. @@@@@@@@@@@@@@@@@
#          # @@@@@@@@@@@@@@@@# . @@@@@@@@@@# @@@@@@:
#        . @@@@# ` @@@@+ ` : . . # @@@@@@@@. ' @@@@@
#        # @@, . . # @@@@@@@@` . ' @@@@# ` . . . @@@@.
#        ` @@. . . . , `    ` . . `     , @@. . . # @@;
#        + @@. . . . `         `           ` . . . ` @@@
#        +@@ . . .        @    `   @       . . . . @@@
#        + @@: . . .           `             ` . . . @@#
#        . @@. . . .           `             ` . . . @@,
#          @@ . . . `         . .           . . . . @
#         ' , . . . . . . . . . . . . ` ` . . . . ` #
#          @@. . . . . . . . , ; . . . . . . . . # '
#           ; + . . . . . . ##@@@@## . . . . . ` @@:
#            # ` . . . ` #@@@@@###@@@# . . . . : '
#             @@. . . . # . -----_-_ . . . . . @
#               , @ . . . . ` ` . . . . . @ ,
#               , | ; @ . . , .|  : @ . . . | ,
#             ' ; | _ _ _ _ . @ @ . _ _ _ _ | ' '
#            ; ' ' ' ' ' + '         ' ' ' ' ' ' ' '
#          ` ' ' ' ; ' ; ' ' ;     : ; ; ; ' ; ' ; '
#          ; ' ; ; ; ; ' ' ' ' ;   ' ' ; ; ; ' ' ' ' ;
#        ' ; ' ' ; ' ' ' ; ' ' ; + ; ' ; ; ; ' ; ' ' '`

Event = require('./Event.coffee')
EventList = require('EventList')

module.exports = class Randy
    # main class for handling random events
    constructor: (eventsFile)->
        # Increase rollsPerRoll to reduce number of events triggering if you
        # are calling roll() a lot (eg in an update loop).
        @rollsPerRoll=300  # how many roll() calls before we actually roll.
        @events = []
        if eventsFile?
            @_loadEventsFromFile(eventsFile)
        else
            # TODO: this should do nothing, but we're loading for testing
            @_loadEventsFromFile("NOT_A_FILE.json")

        $(document).on('forceEvent', (evt, name)=>
            for event in @events
                if event.name == name
                    return event.trigger()
            # else
            throw new Error("Butterflies have no concern for such (eventName:"
                + name + ") things, User. Now I'm gonna go find myself some butterfly poon.")
        )

        @rollsSinceRoll = 0

    _loadEventsFromFile: (file)->
        # loads array of events from a single file
        # TODO: get this json from files
        eventArray = EventList.list

        for event in eventArray
            new_event = new Event(event)
            @events.push(new_event)

    # TODO: setLocation: ()->
    #    # modifies chance of events in event list based on given location
    #    # TODO

    roll: ()->
        # :returns: true if event was triggered, else false
        # Uses just one random call to optimize,
        # and only allows one event to trigger at a time.
        # This means that events aren't 100% random,
        # nor will empirical results match the given "chance" for each.
        # But I think this is a good thing.
        #
        # Consider 3 events w/ 0.5 chance, this is interpreted as:
        #   50% chance of encountering event,
        #   33% chance of each event when event is encountered
        # which means the actual chance of each ends up being 0.5*0.3.
        # Except it's not, b/c randomness isn't as fun as novelty.
        #
        # Why all this nonsense, you ask?
        #   * event chances don't have to be normalized to all other chances
        #        (read: you don't have to adjust all event chances to add one more)
        #   * grouping events this way allows us to artificially boost novelty
        if (@rollsSinceRoll > @rollsPerRoll)
            @rollsSinceRoll = 0  # reset roll count
            die = Math.random()
            most_novel_event = {count: Number.MAX_VALUE}  # to track of the most novel event triggered
            trigger = false
            for event in @events
                if die < event.chance
                    trigger = true
                    if event.count < 1  # if never seen this event
                        event.trigger()
                        return true
                    else  # wait and maybe trigger a more novel event
                        if most_novel_event.count > event.count
                            most_novel_event = event
            # if we reach here, no novel events triggered
            if trigger
                most_novel_event.trigger()
                return true
            else
                return false  # no events triggered
        else
            # else don't roll b/c you ain't roll()ed enough yet.
            @rollsSinceRoll += 1
            return false
