module.exports = function(game, key, spec){
    // loads spritesheet into given game using the given spritespec object
    // console.log('loading spec:', spec);
    if (spec.n > 1){
        game.load.spritesheet(key, util.absPath(spec.sheet), spec.w, spec.h, spec.n);
        // console.log('sheet');
    } else {
        game.load.image(key, util.absPath(spec.sheet));
    }
}
