gameState = function(game){}

gameState.prototype = {
    preload: function() {
        // load menu assets
        this.game.load.image('ship-menu', 'assets/ui/ships.png');

    },
    create: function(){
        /*
            Eye candy code from example diamond burst:
        */
        //
        emitter = this.game.add.emitter(this.game.world.centerX, 100, 200);
        emitter.makeParticles('diamond');
        emitter.start(false, 5000, 20);

        // ####################################################
        // demo pause menu functionality using label as button:
        // ####################################################

        // Then add the menu
        menu = this.game.add.sprite(
            this.game.width/2,
            this.game.height/2,
            'ship-menu'
        );
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiceLabel = this.game.add.text(
            this.game.width/2,
            this.game.height-150,
            'Choose your ship',
            { font: '30px Arial', fill: '#fff' }
        );
        choiceLabel.anchor.setTo(0.5, 0.5);

        choiceLabel.inputEnabled = true;
        choiceLabel.events.onInputUp.add((function(_game){
            return function () {
                if(typeof _game.ship != 'undefined'){
                    _game.state.start('travel-screen');
                }
            }
        })(this.game));

        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(function(event){
            // Calculate the corners of the menu
            var x1 = event.game.width/2 - 270/2, x2 = event.game.width/2 + 270/2,
                y1 = event.game.height/2 - 180/2, y2 = event.game.height/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choicemap = [
                    'JR0D Manned Crew Capsule U',
                    'Arboris AGS-15 ',
                    'J3Zs Modified Orion mk3',
                    'MEH-47 Lame Cartoon Ship',
                    'NCC-1701 Enter-to-win-prize Starship',
                    '12 PRSCs Century Eagle'
                ];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choice = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiceLabel.text = 'Continue with ' + choicemap[choice];
                event.game.ship = choicemap[choice];
            }
            else{
                // Remove the menu and the label
                // menu.destroy();
                // choiceLabel.destroy();
            }
        }, parent);
    },
    upate: function(){

    },
    render: function(){

    }
}

module.exports = gameState;
