module.exports = function(game, key, spec){
    // loads spritesheet into given game using the given spritespec object
    if (spec.n > 1){
        game.load.spritesheet(key, util.absPath(spec.sheet), spec.w, spec.h, spec.n);
    } else {
        game.load.image(key, util.absPath(spec.sheet));
    }
}
