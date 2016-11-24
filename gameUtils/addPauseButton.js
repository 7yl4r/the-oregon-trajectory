function preload(game){
    game.load.image('pause-button', 'assets/ui/pause-button.png');
}

function create(game){
    // ####################################################
    //  slick UI demo pause menu
    // ####################################################
    console.log('inserting pause button...');
    SlickUI = require('slick-ui');
    var button, panel, menuButton;
    game.slickUI.add(panel = new SlickUI.Element.Panel(game.width - 156, 8, 150, game.height - 16));
    panel.add(new SlickUI.Element.Text(10,0, "Menu")).centerHorizontally().text.alpha = 0.5;
    panel.add(button = new SlickUI.Element.Button(0,game.height - 166, 140, 80)).events.onInputUp.add(function () {
        console.log('Clicked save game');
    });

    button.add(new SlickUI.Element.Text(0,0, "Save game")).center();

    panel.add(button = new SlickUI.Element.Button(0,game.height - 76, 140, 40));
    button.add(new SlickUI.Element.Text(0,0, "Close")).center();

    panel.visible = false;
    var basePosition = panel.x;

    game.slickUI.add(menuButton = new SlickUI.Element.DisplayObject(
        game.width - (64 + 8),
        8,
        game.make.sprite(0, 0, 'pause-button')
    ));
    menuButton.inputEnabled = true;
    menuButton.input.useHandCursor = true;
    menuButton.events.onInputDown.add((function(_game) {
        return function() {
            if(panel.visible) {
                return;
            }
            panel.visible = true;
            panel.x = basePosition + 156;
            _game.add.tween(panel).to( {x: basePosition}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                menuButton.visible = false;
            });
            _game.slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
        };
    })(game));

    button.events.onInputUp.add((function (_game) {
        return function(){
            _game.add.tween(panel).to( {x: basePosition + 156}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                panel.visible = false;
                panel.x -= 156;
            });
            menuButton.visible = true;
        };
    })(game));

    var cb1, cb2;
    panel.add(cb1 = new SlickUI.Element.Checkbox(0,100, SlickUI.Element.Checkbox.TYPE_RADIO));
    cb1.events.onInputDown.add(function () {
        if(cb1.checked && cb2.checked) {
            cb2.checked = false;
        }
        if(!cb1.checked && !cb2.checked) {
            cb1.checked = true;
        }
    }, this);

    panel.add(cb2 = new SlickUI.Element.Checkbox(50,100, SlickUI.Element.Checkbox.TYPE_RADIO));
    cb2.events.onInputDown.add(function () {
        if(cb1.checked && cb2.checked) {
            cb1.checked = false;
        }
        if(!cb1.checked && !cb2.checked) {
            cb2.checked = true;
        }
    }, this);

    panel.add(new SlickUI.Element.Checkbox(100,100));
}

module.exports = {preload:preload, create:create}
