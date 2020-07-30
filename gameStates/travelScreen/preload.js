PauseButton = require('pause-button');
StatusDisplay = require('status-display');
EventList = require('EventList');

module.exports = function() {
    game = this.game;
    data = globalData.gameData;
    // #################
    // # visual assets #
    // #################
    // backgrounds:
    data.locationManager.preload(game);

    // player ship:
    game.load.image('player-ship', util.absPath('assets/sprites/ship.png'));

    data.encounterManager.preload(game);

    EventList.preload(game);

    // // TODO could include more in spec using a more advanced loader.
    // // Example usage of loader might be like:
    // SpriteSpecLoader.load(game, 'sprite-key', require('../path/to/spriteSpec.js'));
    // // loader loads files, but holds onto animation data from spec for later
    // sprite = add.sprite('tag');
    // // setup uses saved animation data from spec to set animations and play
    // SpriteSpecLoader.setup(sprite, 'sprite-key');
    // // setup does something like to:
    // //      foreach animation in specs[key].animations
    // //      sprite.animations.add(animation.key, animation.frames);
    // SpriteSpecLoader.play(sprite, 'sprite-key', 'anim-key')
    // //      sprite.animations.play(animation.key, animation.fps);


    // ----------------
    // music assets
    // ----------------
    // game.load.audio('TAG', 'FILE-PATH.mp3');
    // music.theme = new Howl({
    //     urls: ['assets/sound/music/theme/theme.mp3', 'assets/sound/music/theme/theme.ogg'],
    // music.ambience = new Howl({
    //     urls: ['assets/sound/music/ambience1/ambience1.mp3', 'assets/sound/music/ambience1/ambience1.ogg'],
    // music.asteroidMining = new Howl({
    //     urls: [
    //         'assets/sound/music/asteroidMining/asteroidMining.mp3',
    //         'assets/sound/music/asteroidMining/asteroidMining.ogg'
    //     ],
    // music.losing = new Howl({
    //     urls: ['assets/sound/music/Losing.ogg', 'assets/sound/music/Losing.mp3'],
    // music.winning = new Howl({
    //     urls: ['assets/sound/music/winning/winning.ogg', 'assets/sound/music/winning/winning.mp3'],

    // ----------------
    // sound assets
    // ----------------
    // sounds.click = new Howl({
    //     urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
    // sounds.bummer = new Howl({
    //     urls: [
    //         'assets/sound/effects/somethingbad/SomethingBad.mp3',
    //         'assets/sound/effects/somethingbad/SomethingBad.ogg'
    // sounds.shot1 = new Howl({
    //     urls: [
    //         'assets/sound/effects/shot1/shot1.mp3',
    //         'assets/sound/effects/shot1/shot1.ogg',
    //         'assets/sound/effects/shot1/shot1.wav'
    // sounds.shot2 = new Howl({
    //     urls:[
    //         'assets/sound/effects/shot2/shot2.mp3',
    //         'assets/sound/effects/shot2/shot2.ogg'
    // sounds.clunk = new Howl({
    //     urls:[
    //         'assets/sound/effects/clunk/clunk.mp3',
    //         'assets/sound/effects/clunk/clunk.ogg',
    //         'assets/sound/effects/clunk/clunk.wav'
    // sounds.propel = new Howl({
    //     urls:[
    //         'assets/sound/effects/propellant/propellant.mp3',
    //         'assets/sound/effects/propellant/propellant.ogg',
    //         'assets/sound/effects/propellant/propellant.wav'

    // ----------------
    // plugins
    // ----------------
    require('slick-ui-preload')();

    PauseButton.preload(this.game)
    StatusDisplay.preload(this.game)
}
