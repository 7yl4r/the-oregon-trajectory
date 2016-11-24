// And finally the method that handels the pause menu
module.exports = function(event){
    // Only act if paused
    if(event.game.paused){
        // Calculate the corners of the menu
        var x1 = event.game.width/2 - 270/2, x2 = event.game.width/2 + 270/2,
            y1 = event.game.height/2 - 180/2, y2 = event.game.height/2 + 180/2;

        // Check if the click was inside the menu
        if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
            // The choicemap is an array that will help us see which item was clicked
            var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

            // Get menu local coordinates for the click
            var x = event.x - x1,
                y = event.y - y1;

            // Calculate the choice
            var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

            // Display the choice
            choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
        }
        else{
            // Remove the menu and the label
            menu.destroy();
            choiseLabel.destroy();
        }
    }
};
