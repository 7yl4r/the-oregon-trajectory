StatusDisplay = require('status-display');

gameState = function(game){}

gameState.prototype = {
    preload: function() {
        require('slick-ui-preload')();
        StatusDisplay.preload(this.game)

        this.item_consumables = [
            {
                name: 'Rocket Fuel',
                description: "You won't get very far without this.",
                price: 4,
                image: util.absPath("assets/sprites/shop-icons/fuel.png"),
                key: "fuel"
            },{
                name: 'Rations',
                description: "Not just freeze-dried ice cream.",
                price: 2,
                image: util.absPath("assets/sprites/shop-icons/food.png"),
                key: "rations"
            },{
                name: 'Water',
                description: "Di-hydrogen monoxide has many uses.",
                price: 1,
                image: util.absPath("assets/sprites/shop-icons/food.png"),
                key: "rations"
            }
        ];
        this.tab = 1;
        this.activeItem = this.item_consumables[0];
    },
    create: function(){
        game = this.game
        game.inMenu = true;
        StatusDisplay.create(game);
        StatusDisplay.update(game);
        this.data = globalData.gameData;

        settings = this.data.UISettings;
        var PAD = settings.pad;
        var FONT_SIZE = settings.fontSize;
        var OVERHANG = PAD;
        var BUTTON_H = settings.buttonH;
        var BUTTON_W = settings.buttonW;

        // LEFT PANEL
        game.slickUI.add(leftPanel = new SlickUI.Element.Panel(
            -OVERHANG,
            settings.middlePanelTop,
            settings.leftPanelW,
            settings.middlePanelH
        ));
        leftPanel.alpha = settings.panelAlpha;

        // EXIT BUTTON
        game.slickUI.add(exitButton = new SlickUI.Element.Button(
            game.width/2,
            game.height - PAD - BUTTON_H,
            BUTTON_W,
            BUTTON_H
        )).events.onInputUp.add(function () {
            game.inMenu = false;
            game.state.start('travel-screen');
        });
        exitButton.add(new SlickUI.Element.Text(0,0, "Exit Shop")).center();

    },
    update: function(){

    },
    render: function(){

    },
    buy: function(){
        // TODO: get amount from UI
        var amt = 1;//parseInt(document.getElementById(this.activeItem.key).value);
        var total = amt * this.activeItem.price;

        if (typeof this.activeItem.key !== 'undefined') {
            var stored = this.data[this.activeItem.key];
            if (amt < 0 && stored > 0) {
                // selling
                this.data[this.activeItem.key] += amt;
                this.data.money -= total;

                // sounds.click.play();
            }
            else if (total <= data.money && amt > 0) {
                // buying
                this.data[this.activeItem.key] += amt;
                this.data.money -= total;
                // sounds.click.play();
            }
            else {
                console.log("ERROR: Not enough money or resources!");
            }
        }
    }
}

module.exports = gameState;


// ##########################################################################
//          CODE TO PORT:
// ##########################################################################
//
//     this.setActiveItem = function(itemName) {
//         for (var i = 0; i < this.item_consumables.length; i++) {
//             var item = this.item_consumables[i];
//             if (itemName == item.name) this.activeItem = item;
//         }
//     };
//
//     this.ifItemActive = function(itemName) {
//         if (itemName == this.activeItem.name) {
//             return "item-container-selected";
//         }
//         return '';
//     };
//
//     this.toSpace = function(){
//         sounds.click.play();
//         $scope.$emit('switchToModule', 'travel-screen');
//     };
//
//     this.onEntry = function() {
//         var greetingsOgg = [];
//         greetingsOgg.push("assets/sound/effects/shop/F1BePrepared.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F1EverythingYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F1Hey.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F1StockUp.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F1WhatDoYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F1WhatDoYouWant.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F1BePrepared.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F2EverythingYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F2Hey.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F2StockUp.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F2WhatDoYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/F2WhatDoYouWant.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M1BePrepared.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M1EverythingYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M1Hey.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M1StockUp.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M1WhatDoYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M1WhatDoYouWant.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M2BePrepared.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M2EverythingYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M2Hey.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M2StockUp.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M2WhatDoYouNeed.ogg");
//         greetingsOgg.push("assets/sound/effects/shop/M2WhatDoYouWant.ogg");
//
//         var greetingsMP3 = [];
//         greetingsMP3.push("assets/sound/effects/shop/F1BePrepared.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F1EverythingYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F1Hey.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F1StockUp.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F1WhatDoYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F1WhatDoYouWant.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F1BePrepared.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F2EverythingYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F2Hey.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F2StockUp.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F2WhatDoYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/F2WhatDoYouWant.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M1BePrepared.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M1EverythingYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M1Hey.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M1StockUp.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M1WhatDoYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M1WhatDoYouWant.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M2BePrepared.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M2EverythingYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M2Hey.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M2StockUp.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M2WhatDoYouNeed.mp3");
//         greetingsMP3.push("assets/sound/effects/shop/M2WhatDoYouWant.mp3");
//
//         var rand = Math.random();
//         var index = Math.floor(rand * (greetingsOgg.length - 1));
//         var sound = new Howl({
//             urls: [greetingsOgg[index], greetingsMP3[index]]
//         });
//         sound.play();
//     };
// }]);