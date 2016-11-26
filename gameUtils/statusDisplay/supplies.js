SIFormat = require('si-number-formatter');

function preload(game){
    // game.load.image('pause-button', 'assets/ui/pause-button.png');
}

function create(game){
    SlickUI = require('slick-ui');
    var PAD = 10;
    var FONT_SIZE = 16;
    var OVERHANG = PAD;
    var PANEL_HEIGHT = 80;
    var PANEL_WIDTH = PAD*2 + 230;
    var SECTION_WIDTH = (PANEL_WIDTH - PAD*2.0) / 3.0;
    game.slickUI.add(panel = new SlickUI.Element.Panel(
        PAD,
        -OVERHANG,
        PANEL_WIDTH,
        PANEL_HEIGHT
    ));
    panel.alpha = 0.4;
    panel.add(new SlickUI.Element.Text(
        0 ,
        PAD + OVERHANG,
        "fuel | water | food",
        FONT_SIZE,
        "minecraftia-white"
    )).centerHorizontally();
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


}

function update(game){
    this.fuelText.value = SIFormat(globalData.gameData.fuel);
    this.waterText.value = SIFormat(globalData.gameData.water);
    this.rationText.value = SIFormat(globalData.gameData.rations);
}

module.exports = {preload:preload, create:create, update:update}
