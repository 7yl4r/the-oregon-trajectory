function preload(game){
    game.load.image('pause-button', 'assets/ui/pause-button.png');
}

function create(game){
    // ####################################################
    //  based on slick UI menu demo
    // ####################################################
    SlickUI = require('slick-ui');
    var button, panel, pauseButton;
    game.slickUI.add(panel = new SlickUI.Element.Panel(
        game.width - 156,
        8,
        150,
        game.height - 16
    ));

    panel.add(new SlickUI.Element.Text(10,0, "Paused"))
        .centerHorizontally().text.alpha = 0.5;

    // QUIT BUTTON
    panel.add(quitButton = new SlickUI.Element.Button(0,game.height - 166, 140, 80))
        .events.onInputUp.add(function () {
            game.inMenu = false;
            globalData.gameData.reset();
            game.state.start('boot');
    });
    quitButton.add(new SlickUI.Element.Text(0,0, "Quit to Menu")).center();


    // RESUME BUTTON
    panel.add(resumeButton = new SlickUI.Element.Button(0,game.height - 76, 140, 40));
    resumeButton.add(new SlickUI.Element.Text(0,0, "Resume")).center();
    resumeButton.events.onInputUp.add((function (_game) {
        return function(){
            _game.add.tween(panel).to( {x: basePosition + 156}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                panel.visible = false;
                panel.x -= 156;
            });
            pauseButton.visible = true;

            _game.inMenu = false;  // unpause
        };
    })(game));

    panel.visible = false;
    var basePosition = panel.x;

    // PAUSE BUTTON
    game.slickUI.add(pauseButton = new SlickUI.Element.DisplayObject(
        game.width - (64 + 8),
        game.height- (64 + 8),
        game.make.sprite(0, 0, 'pause-button')
    ));

    pauseButton.inputEnabled = true;
    pauseButton.input.useHandCursor = true;
    pauseButton.events.onInputDown.add((function(_game) {
        return function() {
            if(panel.visible) {
                return;
            }
            _game.inMenu = true;  // pause
            panel.visible = true;
            panel.x = basePosition + 156;
            _game.add.tween(panel).to( {x: basePosition}, 500, Phaser.Easing.Exponential.Out, true).onComplete.add(function () {
                pauseButton.visible = false;
            });
            _game.slickUI.container.displayGroup.bringToTop(panel.container.displayGroup);
        };
    })(game));

    // // RADIO BUTTONS
    // var cb1, cb2;
    // panel.add(cb1 = new SlickUI.Element.Checkbox(0,100, SlickUI.Element.Checkbox.TYPE_RADIO));
    // cb1.events.onInputDown.add(function () {
    //     if(cb1.checked && cb2.checked) {
    //         cb2.checked = false;
    //     }
    //     if(!cb1.checked && !cb2.checked) {
    //         cb1.checked = true;
    //     }
    // }, this);
    //
    // panel.add(cb2 = new SlickUI.Element.Checkbox(50,100, SlickUI.Element.Checkbox.TYPE_RADIO));
    // cb2.events.onInputDown.add(function () {
    //     if(cb1.checked && cb2.checked) {
    //         cb1.checked = false;
    //     }
    //     if(!cb1.checked && !cb2.checked) {
    //         cb2.checked = true;
    //     }
    // }, this);

    // // CHECKBOX:
    // panel.add(new SlickUI.Element.Checkbox(100,100));
}

module.exports = {preload:preload, create:create}
