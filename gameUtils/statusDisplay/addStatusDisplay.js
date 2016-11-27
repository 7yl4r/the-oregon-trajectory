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
    panelArgs = globalData.gameData.UISettings;
    panelArgs.game = game;

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
