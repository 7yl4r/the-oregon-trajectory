# defines a background tile for use in the travel screen
module.exports = class Tile
    gameWidth = 800

    constructor: (startX, imageObject)->
        @img = imageObject
        @img.anchor.setTo(0, 0.5)
        @img.x = startX

        @travelCount = 0

    travel: ()->
        # moves the tile 1 travel unit
        if @travelCount > TRAVELS_PER_MOVE
            @img.x -= window.TRAVEL_SPEED
            @travelCount = 0
        else
            @travelCount += 1

    getOverhang: ()->
        # returns theoretical amount of tile overhanging right of screen,
        #   yet to be traveled to
        # console.log('w(' + @img.width + ') + x(' + @img.x + ')')
        return @img.width + @img.x

    hasTravelledOffscreen: ()->
        # returns true if tile has travelled left off screen
        return (@img.width + @img.x) < 0
