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
    var PANEL_HEIGHT = args.statusPanelHeight + OVERHANG;
    var PANEL_WIDTH = PAD*2 + args.statusSupplyWidth;
    var SECTION_WIDTH = (PANEL_WIDTH - PAD*2.0) / 4.0;
    game.slickUI.add(panel = new SlickUI.Element.Panel(
        PAD,
        -OVERHANG,
        PANEL_WIDTH,
        PANEL_HEIGHT
    ));
    panel.alpha = args.panelAlpha;
    panel.add(new SlickUI.Element.Text(
        0 ,
        PAD + OVERHANG,
        "fuel water food money",
        FONT_SIZE,
        "minecraftia-white"
    ));
    panel.add(this.fuelText = new SlickUI.Element.Text(
        PAD,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));
    panel.add(this.waterText = new SlickUI.Element.Text(
        PAD+SECTION_WIDTH,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));
    panel.add(this.rationText = new SlickUI.Element.Text(
        PAD+SECTION_WIDTH*2,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));
    panel.add(this.moneyText = new SlickUI.Element.Text(
        PAD+SECTION_WIDTH*3,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));


}

function update(game){
    this.fuelText.value = SIFormat(globalData.gameData.fuel);
    this.waterText.value = SIFormat(globalData.gameData.water);
    this.rationText.value = SIFormat(globalData.gameData.rations);
    this.moneyText.value = SIFormat(globalData.gameData.money);
}

module.exports = {preload:preload, create:create, update:update}
