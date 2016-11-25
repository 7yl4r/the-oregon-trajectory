module.exports = function(){
    SlickUI = require('slick-ui');
    globalData.game.slickUI = globalData.game.plugins.add(Phaser.Plugin.SlickUI);
    globalData.game.slickUI.load(util.absPath('assets/ui/kenney/kenney.json'));
}
