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
    game.slickUI.add(supp_panel = new SlickUI.Element.Button(
        PAD,
        -OVERHANG,
        PANEL_WIDTH,
        PANEL_HEIGHT
    ));
    supp_panel.alpha = args.panelAlpha;
    // === panel interactivity
    supp_panel.inputEnabled = true;
    supp_panel.input.useHandCursor = true;
    supp_panel.events.onInputDown.add((function(_game) {
        return function() {
            if(panel_expanded) {
                console.warn("TODO: retract panel")
            } else {
                _game.inMenu = true;  // pause
                panel_expanded = true;
                supp_panel.y = basePosition + 200;
                _game.add.tween(supp_panel).to( {y: basePosition}, 500, Phaser.Easing.Exponential.Out, true)/*.onComplete.add(function () {
                    pauseButton.visible = false;
                });*/
                _game.slickUI.container.displayGroup.bringToTop(supp_panel.container.displayGroup);
            }
        };
    })(game));
    var panel_expanded = false;
    var basePosition = supp_panel.y

    // === panel sub-elements:
    supp_panel.add(new SlickUI.Element.Text(
        0 ,
        PAD + OVERHANG,
        "fuel water food money",
        FONT_SIZE,
        "minecraftia-white"
    ));
    supp_panel.add(this.fuelText = new SlickUI.Element.Text(
        PAD,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));
    supp_panel.add(this.waterText = new SlickUI.Element.Text(
        PAD+SECTION_WIDTH,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));
    supp_panel.add(this.rationText = new SlickUI.Element.Text(
        PAD+SECTION_WIDTH*2,
        PAD + OVERHANG + FONT_SIZE,
        " 0000",
        FONT_SIZE,
        "minecraftia-white"
    ));
    supp_panel.add(this.moneyText = new SlickUI.Element.Text(
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
