class EncounterManager {
  constructor(trajJSON) {
      this.LANDMARK = trajJSON.LANDMARK
  }

  setPotentialEncounters(encountersJSON){
      // sets potential encounters array
      // TODO:
      console.log('set pot enc');
  }

  preload(game){
      // maneuver marker:
      loadSpriteSheet(game, 'maneuver', require('../assets/sprites/maneuver-node/spriteSpec'));
      // landmark sprites:
      loadSpriteSheet(game, this.LANDMARK.ISS+'-station', require('../assets/sprites/stations/iss/spriteSpec'));
      loadSpriteSheet(game, this.LANDMARK.MOON+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
      loadSpriteSheet(game, this.LANDMARK.MARS+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
      loadSpriteSheet(game, this.LANDMARK.CERES+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
      loadSpriteSheet(game, this.LANDMARK.EUROPA+'-station', require('../assets/sprites/stations/marker1/spriteSpec'));
  }
}

module.exports = EncounterManager
