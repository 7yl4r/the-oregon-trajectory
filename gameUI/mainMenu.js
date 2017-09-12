// And finally the method that handels the main menu
module.exports = function(event){
    // Calculate the corners of the menu
    var w = 464,
        h = 250;

    var xn = 1,  // number of buttons in grid x, y directions
        yn = 5;

    var button_w = w/xn,
        button_h = h/yn;

    var x1 = event.game.width/2 - w/2, x2 = event.game.width/2 + w/2,
        y1 = event.game.height/2 - h/2, y2 = event.game.height/2 + h/2;

    // Check if the click was inside the menu
    if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){

        // Get menu local coordinates for the click
        var x = event.x - x1,
            y = event.y - y1;

        // Calculate the choice
        var choice = Math.floor(y / button_h);//Math.floor(x / button_w) + (xn-1)*Math.floor(y / button_h);
        console.log("choice ("+x+","+y+"):" + choice);

        switch(choice){
            case 0:
                event.game.state.start('travel-screen');
                break;
            default:
                break
        }

    }
};
