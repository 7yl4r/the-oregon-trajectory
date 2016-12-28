// Event manager acts as layer around whatever event system we're using.
//      ie: jquery custom events, phaser.signal, etc.
//      Why??? for debugging and easy switching between event systems later.
class EventManager {
    constructor() {
        // for now we just use jquery, but in future can pass arg like sys='jquery'
    }
    on(key, fn){
        console.log('registered new fn for ', key);
        $(document).on(key, fn);
    }
    trigger(key, payload){
        console.log('trigger ', key, ' data=', payload);
        $(document).trigger(key, payload);
    }
}

module.exports = EventManager
