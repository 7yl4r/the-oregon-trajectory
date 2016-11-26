supplyPanel = require('./supplies');
trajPanel = require('./trajectory');
healthPanel = require('./health');

function preload(game){
    game.load.image('pause-button', 'assets/ui/pause-button.png');
    supplyPanel.preload(game);
    trajPanel.preload(game);
    healthPanel.preload(game);
}

function create(game){
    panelArgs = {
        game: game,
        pad: 10,
        fontSize: 16,
        panelHeight: 80,
        supplyWidth: 230,
        trajWidth: 230,
        healthWidth: 230,
        panelAlpha: 0.4
    }

    supplyPanel.create(panelArgs);
    trajPanel.create(panelArgs);
    healthPanel.create(panelArgs);
}

function update(game){
    supplyPanel.update(game);
    trajPanel.update(game);
    healthPanel.update(game);
}

module.exports = {preload:preload, create:create, update:update}