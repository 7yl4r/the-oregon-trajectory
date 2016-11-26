supplyPanel = require('./supplies');

function preload(game){
    game.load.image('pause-button', 'assets/ui/pause-button.png');
    supplyPanel.preload(game);
}

function create(game){
    supplyPanel.create(game);
}

function update(game){
    supplyPanel.update();
}

module.exports = {preload:preload, create:create, update:update}
