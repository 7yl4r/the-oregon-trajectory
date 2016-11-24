module.exports = function (parent) {
    // When the paus button is pressed, we pause the game
    parent.game.paused = true;

    // Then add the menu
    menu = parent.game.add.sprite(
        parent.game.width/2,
        parent.game.height/2,
        'pause-menu'
    );
    menu.anchor.setTo(0.5, 0.5);

    // And a label to illustrate which menu item was chosen. (This is not necessary)
    choiseLabel = parent.game.add.text(
        parent.game.width/2,
        parent.game.height-150,
        'Click outside menu to continue',
        { font: '30px Arial', fill: '#fff' }
    );
    choiseLabel.anchor.setTo(0.5, 0.5);

    // Add a input listener that can help us return from being paused
    parent.game.input.onDown.add(require('pause-controller'), parent);
}
