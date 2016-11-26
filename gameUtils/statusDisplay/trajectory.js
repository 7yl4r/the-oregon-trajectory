SIFormat = require('si-number-formatter');
SlickUI = require('slick-ui');

function preload(game){
    // game.load.image('pause-button', 'assets/ui/pause-button.png');
}

function create(args){
    var game = args.game;
    var PAD = args.pad;
    var FONT_SIZE = args.fontSize;
    var OVERHANG = PAD;
    var PANEL_HEIGHT = args.panelHeight;
    var PANEL_WIDTH = PAD*2 + args.trajWidth;
    var SECTION_WIDTH = (PANEL_WIDTH - PAD*2.0) / 3.0;
    game.slickUI.add(panel = new SlickUI.Element.Panel(
        PAD*4 + args.supplyWidth,
        -OVERHANG,
        PANEL_WIDTH,
        PANEL_HEIGHT
    ));
    panel.alpha = args.panelAlpha;

    panel.add(slider = new SlickUI.Element.Slider(PAD, PANEL_HEIGHT/2, panel.width - 2*PAD, 0));

    slider.container.children.forEach(function(ch){ch.container.displayGroup.fixedToCamera = true});
    slider.container.displayGroup.fixedToCamera = true;

    window.slider = slider;
}

function update(game){
    // window.slider.value -= 0.0001;
}

module.exports = {preload:preload, create:create, update:update}
