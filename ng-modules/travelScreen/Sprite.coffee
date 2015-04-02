module.exports = class Sprite
    constructor: (spritesheet, x=0, y=0)->
        # sets up new sprite using given spritesheet src centered at x & y position on canvas
        @sheet = new Image()
        @sheet.src = spritesheet
        @h = 399
        @w = 182
        @x = x
        @y = y
        @frame_n = 0
        @max_frames = 4
        # for slowing animation speed
        @draws_per_frame = 50  # number of draw calls before setting new frame
        @draw_counter = 0

    next_frame: ()->
        @frame_n += 1
        if @frame_n > @max_frames
            @frame_n = 0

    draw: (ctx, x=@x, y=@y) ->
        # draws a sprite centered at given location, or uses internal
        # set locations to start in sprite sheet
        ssx = @frame_n * @w
        ssy = 0  # TODO: use y-axis in spritesheets for different ship conditionals/permuations (damage, age, etc)
        x = x - @w/2
        y = y - @h/2
        ctx.drawImage(@sheet, ssx, ssy, @w, @h, x, y, @w, @h)
        @draw_counter += 1
        if @draw_counter > @draws_per_frame
            @next_frame()
            @draw_counter = 0
