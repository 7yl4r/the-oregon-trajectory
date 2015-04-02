module.exports = class Tile
    constructor: (startX, imageElement)->
        @x = startX
        @img = imageElement
        @travelCount = 0

    draw: (ctx)->
        # draws the tile
        ctx.drawImage(@img, @x, 0)
        return

    travel: ()->
        # moves the tile 1 travel unit
        if @travelCount > TRAVELS_PER_MOVE
            @x -= window.TRAVEL_SPEED
            @travelCount = 0
        else
            @travelCount += 1

    getOverhang: ()->
        # returns theoretical amount of tile overhanging right of screen, yet to be traveled to
        return @img.naturalWidth + @x - window.innerWidth

    hasTravelledOffscreen: ()->
        # returns true if tile has travelled left off screen
        return (@img.naturalWidth + @x) < 0
