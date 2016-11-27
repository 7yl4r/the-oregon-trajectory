SIFormat = require('si-number-formatter');
SlickUI = require('slick-ui');

function preload(game){
    // game.load.image('pause-button', 'assets/ui/pause-button.png');
}

function create(args){
    var game = args.game;
    this.args = args;
    var PAD = args.pad;
    var FONT_SIZE = args.fontSize;
    var OVERHANG = PAD;
    var PANEL_HEIGHT = args.statusPanelHeight + OVERHANG;
    var PANEL_WIDTH = PAD*2 + args.statusTrajWidth;
    var SECTION_WIDTH = (PANEL_WIDTH - PAD*2.0) / 3.0;
    var PANEL_X = PAD*4 + args.statusSupplyWidth;
    game.slickUI.add(this.panel = new SlickUI.Element.Panel(
        PANEL_X,
        -OVERHANG,
        PANEL_WIDTH,
        PANEL_HEIGHT
    ));
    this.panel.alpha = args.panelAlpha;

    // panel.add(this.slider = new SlickUI.Element.Slider(PAD, PANEL_HEIGHT/2, panel.width - 2*PAD, 0));
    var renderedSprites = game.slickUI.getRenderer('slider').render(this.panel.width - 2*PAD);
    var sprite_base = renderedSprites[0];
    var handle_off = renderedSprites[1];
    var handle_on = renderedSprites[2];
    sprite_base.x = PANEL_X + PAD;
    sprite_base.y = PANEL_HEIGHT/2;
    sprite_base.fixedToCamera = true;
    this.panel.container.displayGroup.add(sprite_base);

    this.sprite_handle = game.make.sprite(this.panel.x+PAD, PAD, handle_off.texture);
    // this.sprite_handle.anchor.setTo(0.5);
    this.sprite_handle.fixedToCamera = true;
    this.panel.container.displayGroup.add(this.sprite_handle);
}

function update(game){
    var newVal = globalData.gameData.displayDistanceTraveled /
        globalData.gameData.worldWidth_AU;
    // console.log('sliderTo:', newVal);
    this.sprite_handle.cameraOffset.x = this.panel.x + this.args.pad + newVal * (panel.width-2*this.args.pad);

}

module.exports = {preload:preload, create:create, update:update}
