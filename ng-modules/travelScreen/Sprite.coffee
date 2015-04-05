
module.exports = class Sprite
    constructor: (spritesheet, name, x=0, y=0)->
        # sets up new sprite using given spritesheet src centered at x & y position on canvas
        @sheet = new Image()
        @sheet.src = spritesheet
        @r = 0  # rotation
        @setDimensions(name)
        @x = x
        @y = y
        @frame_n = 0
        # for slowing animation speed
        @draws_per_frame = 50  # number of draw calls before setting new frame
        @draw_counter = 0

    setDimensions: (name)->
        # sets dimensions, max_frames, draws_per_frame based on name to match given sprite
        switch name
            when "station1"
                @h = 399
                @w = 182
                @max_frames = 4
                @scale = 1
            when "ship"
                @h = 150
                @w = 338
                @max_frames = 0
                @scale = 0.6
            when "satelite-debris-1"
                @h = 150
                @w = 512
                @max_frames = 0
                @scale = 0.3 + Math.random()*0.2
                @r = Math.random()*Math.PI*2

    next_frame: ()->
        @frame_n += 1
        if @frame_n > @max_frames
            @frame_n = 0

    draw: (ctx, x=@x, y=@y) ->
        # draws a sprite centered at given location, or uses internal
        # set locations to start in sprite sheet
        ssx = @frame_n * @w
        ssy = 0  # TODO: use y-axis in spritesheets for different ship conditionals/permuations (damage, age, etc)
        if @r != 0
            ctx.save()
            ctx.translate(x,y)
            ctx.rotate(@r)
            ctx.drawImage(@sheet, ssx, ssy, @w, @h, -@w/2, -@h/2, @w*@scale, @h*@scale)
            ctx.restore()
        else
            ctx.drawImage(@sheet, ssx, ssy, @w, @h, x-@w/2, y-@h/2, @w*@scale, @h*@scale)

        @draw_counter += 1
        if @draw_counter > @draws_per_frame
            @next_frame()
            @draw_counter = 0
