mining = function(game){
    console.log('starting game state : mining')
}

mining.prototype = {
    preload: function() {
        this.game.load.image('diamond', 'assets/sprites/advice/frustrated.png');
        this.game.load.image('menu', 'assets/sprites/building.png');
    },
    create: function() {
        /*
            Code from example diamond burst
        */
        this.game.stage.backgroundColor = '#337799';
        emitter = this.game.add.emitter(this.game.world.centerX, 100, 200);
        emitter.makeParticles('diamond');
        emitter.start(false, 5000, 20);


        /*
            Code for the pause menu
        */

        // Create a label to use as a button
        pause_label = this.game.add.text(
            this.game.width - 100,
            20,
            'Pause',
            { font: '24px Arial', fill: '#fff' }
        );
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function (parent) {
            // When the paus button is pressed, we pause the game
            parent.game.paused = true;

            // Then add the menu
            menu = parent.game.add.sprite(
                parent.game.width/2,
                parent.game.height/2,
                'menu'
            );
            menu.anchor.setTo(0.5, 0.5);

            // And a label to illustrate which menu item was chosen. (This is not necessary)
            choiseLabel = parent.game.add.text(
                parent.game.width/2,
                parent.game.height-150,
                'Click outside menu to continue',
                { font: '30px Arial', fill: '#fff' }
            );
            choiseLabel.anchor.setTo(0.5, 0.5);
        }, self);

        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(unpause, self);

        // And finally the method that handels the pause menu
        function unpause(event){
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

                    // Unpause the game
                    event.game.paused = false;
                }
            }
        };
    }
}

module.exports = mining
