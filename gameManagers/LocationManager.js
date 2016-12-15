drift = require('drift')

class LocationManager {
    constructor(trajJSON) {
        for (var location of trajJSON.trajectory.locations){
            location.locObj = buildLocation(location);
        }
    }
    setLocations(encountersJSON){
        // sets potential encounters array
        // TODO:
        console.log('set locations');
    }
    preload(game){
        game.load.image('filler', util.absPath('assets/backgrounds/filler.png'));
        game.load.image('moon', util.absPath('assets/backgrounds/moon.png'));
        game.load.image('earth', util.absPath('assets/backgrounds/bg.png'));
        game.load.image('mars', util.absPath('assets/backgrounds/mars.png'));
        game.load.image('ceres', util.absPath('assets/backgrounds/ceres.png'));
        game.load.image('jupiter', util.absPath('assets/backgrounds/jupiter.png'));
        game.load.image('europa', util.absPath('assets/backgrounds/europa.png'));
    }
}


class Location {
    // # constructor: (name, x, spriteKey=undefined, trigger=undefined)->
    // #     # console.log('new Loc(', name, x, actionKey, '):', this)
    // #     this.name = name
    // #     this.x = x
    // #     this.spriteKey = spriteKey
    // #
    // #     if spriteKey?
    // #         this.spriteKey = spriteKey
    // #     else
    // #         this.spriteKey = name
    constructor(locJSON){
        // # console.log('new Loc(', name, x, actionKey, '):', this)
        this.name = locJSON.name;
        this.x = locJSON.distance_px;
        this.spriteKey = locJSON.key;
    }
    addLocationSprite(gameState, data, location){
        // # draws location sprite if in view at global Xposition
        // # if w/in reasonable draw distance
        game = gameState.game;

        // # TODO: add rotation
        try {
            location.sprite = game.add.sprite(
                location.distance + gameState.SHIP_INITIAL_POS,
                drift(game.height/2),
                this.spriteKey
            );
            location.sprite.animations.add('animation1');
            location.sprite.animations.play('animation1', 2, true);
            location.sprite.anchor.setTo(0.5, 0.5);
            location.sprite.update = function(){
                this.y = drift(this.y)
            }
        }catch (error){  //# probably spriteKey not found
            console.warn(error)
        }

        // # console.log('sprite added for ', location);
        // # window.currentLocation = location;
    }
}

buildLocation = function(locJSON){
    // # location builder
    // # console.log('build', locJSON)
    return new Location(locJSON);
}

module.exports = LocationManager
