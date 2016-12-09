SlickUI = require('slick-ui');

function preload(game){
    game.load.image('happy', 'assets/ui/happy.png');
    game.load.image('neutral', 'assets/ui/neutral.png');
    game.load.image('sad', 'assets/ui/sad.png');
}

function create(args){
    var game = args.game;
    this.args = args;
    var PAD = args.pad;
    var FONT_SIZE = args.fontSize;
    var OVERHANG = PAD;
    var PANEL_HEIGHT = args.statusPanelHeight + OVERHANG;
    var PANEL_WIDTH = PAD*2 + args.statusHealthWidth;
    var SECTION_WIDTH = (PANEL_WIDTH - PAD*2.0) / 3.0;
    var PANEL_X = PAD*7 + args.statusSupplyWidth + args.statusTrajWidth;
    game.slickUI.add(this.panel = new SlickUI.Element.Panel(
        PANEL_X,
        -OVERHANG,
        PANEL_WIDTH,
        PANEL_HEIGHT
    ));
    this.panel.alpha = args.panelAlpha;

    var SPRITE_W = 32;
    this.healthIndicators = [];
    var n_crew = 3;
    for (var i = 0; i < n_crew; i++){ // TODO: should be one for each crew
        var crewIndicator = game.make.sprite(this.panel.x+PAD, PAD, 'happy');
        crewIndicator.anchor.setTo(0.5);
        crewIndicator.fixedToCamera = true;
        this.panel.add(new SlickUI.Element.DisplayObject(
            this.panel.width/2 + (PAD + SPRITE_W)*(i-(n_crew-1)/2),
            this.panel.height / 2,
            crewIndicator
        ));
        this.healthIndicators.push(crewIndicator);
    }
    // TODO: catch onHealthChanged signals and change texture of sprite to neutral/sad
}

function update(game){

}

module.exports = {preload:preload, create:create, update:update}
