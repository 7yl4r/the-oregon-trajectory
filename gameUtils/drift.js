module.exports = function(height){
    // returns slightly drifted modification on given height
    MAX_HEIGHT = 400
    MIN_HEIGHT = 200
    if (Math.random() < 0.05) {  // small chance of drift
        height += Math.round(Math.random() * 2 - 1);
        if (height > MAX_HEIGHT) {
            height = MAX_HEIGHT-1
        } else if (height < MIN_HEIGHT) {
            height = MIN_HEIGHT+1
        }
    }
    return height;
}
