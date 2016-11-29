StatusDisplay = require('status-display');

gameState = function(game){}

gameState.prototype = {
    item_consumables: [
        {
            name: 'Rocket Fuel',
            description: "You won't get very far without this.",
            price: 4,
            key: "fuel"
        },{
            name: 'Rations',
            description: "Not just freeze-dried ice cream.",
            price: 2,
            key: "rations"
        },{
            name: 'Water',
            description: "Di-hydrogen monoxide has many uses.",
            price: 1,
            key: "water"
        }
    ],
    preload: function() {
        console.log('shop preload');

        this.game.load.image('fuel', util.absPath('assets/sprites/shop-icons/fuel.png'));
        this.game.load.image('rations', util.absPath('assets/sprites/shop-icons/food.png'));
        this.game.load.image('water', util.absPath('assets/sprites/shop-icons/food.png')); // TODO: change

        require('slick-ui-preload')();
        StatusDisplay.preload(this.game);

        this.tab = 1;
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
            0,
            settings.middlePanelTop,
            settings.leftPanelW,
            settings.middlePanelH
        ));
        // leftPanel.alpha = settings.panelAlpha;

        leftPanel.add(leftInnerPanel = new SlickUI.Element.Panel(
            0,
            0,
            leftPanel.width,
            leftPanel.height
        ));

        // ITEM SELCTION BUTTONS
        // shop button sizes depend on panel size
        var bttnSize = settings.leftPanelW/2 - PAD;
        for (var i = 0; i < this.item_consumables.length; i++){
            var x = i%2*(bttnSize+PAD);
            var y = Math.floor(i/2)*(bttnSize+PAD)
            leftInnerPanel.add(itemButton = new SlickUI.Element.Button(
                x,
                y,
                bttnSize,
                bttnSize
            )).events.onInputUp.add((function(_this,_i){
                return function () {
                    _this.setActiveItem(_i);
                }
            })(this, i));
            var itemSprite = game.make.sprite(0,0,this.item_consumables[i].key);
            itemSprite.width = bttnSize-PAD;
            itemSprite.height = bttnSize-PAD;
            itemSprite.anchor.setTo(0.5);
            itemButton.add(new SlickUI.Element.DisplayObject(
                itemButton.width / 2,
                itemButton.height / 2,
                itemSprite
            ));
            itemButton.add(new SlickUI.Element.Text(0,0, this.item_consumables[i].price + '$')).center();
        }

        // RIGHT PANEL
        game.slickUI.add(this.rightPanel = new SlickUI.Element.Panel(
            settings.leftPanelW+PAD,
            settings.middlePanelTop,
            settings.leftPanelW,
            settings.middlePanelH
        ));

        // EXIT BUTTON
        game.slickUI.add(exitButton = new SlickUI.Element.Button(
            game.width/2 - BUTTON_W/2,
            game.height - PAD - BUTTON_H,
            BUTTON_W,
            BUTTON_H
        )).events.onInputUp.add(function () {
            game.inMenu = false;
            game.state.start('travel-screen');
        });
        exitButton.add(new SlickUI.Element.Text(0,0, "Exit Shop")).center();

        window.shop = this;  // TODO: remove this debug option
        this.makeRightPanel(this.rightPanel, settings);
        this.setActiveItem(0);
    },
    update: function(){

    },
    render: function(){

    },
    setActiveItem(newItemIndex){
        // use this to set the active item so that UI is updated
        console.log('active item set to ', this.item_consumables[newItemIndex].name);
        this.activeItem = this.item_consumables[newItemIndex];
        this.updateActiveItemPanel(this.rightPanel, globalData.gameData.UISettings);
    },
    updateActiveItemPanel(rightPanel, settings){
        // clears and draws the rightPanel with active item information.
        console.log('update active item panel');
        this.rightPanelTitle.text.setText(this.activeItem.name);
        this.rightPanelSprite.sprite.loadTexture(this.activeItem.key);
        this.rightPanelText.text.setText(this.activeItem.description);
    },
    makeRightPanel(rightPanel, settings){
        this.activeItem = this.item_consumables[0];
        rightPanel.add(this.rightPanelTitle = new SlickUI.Element.Text(
            rightPanel.width/2 - 40, // 40 for est text width
            settings.pad,
            'ITEM NAME'
        ));

        var activeSprite = game.make.sprite(0,0,'fuel');
        activeSprite.width = rightPanel.width/2;
        activeSprite.height = activeSprite.width;
        // activeSprite.anchor.setTo(1);
        rightPanel.add(this.rightPanelSprite = new SlickUI.Element.DisplayObject(
            (rightPanel.width - activeSprite.width) / 2,
            settings.fontSize + settings.pad,
            activeSprite
        ));

        rightPanel.add(this.rightPanelText = new SlickUI.Element.Text(
            settings.pad,
            settings.fontSize + settings.pad*3 + activeSprite.height,
            'DESCRIPTION'
        ));
        // this.rightPanelText.centerHorizontally();

        var bttnW = (rightPanel.width)/3 - settings.pad;
        var bttnX = settings.pad;
        rightPanel.add(buyButton = new SlickUI.Element.Button(
            bttnX,
            rightPanel.height - settings.pad - settings.buttonH,
            bttnW,
            settings.buttonH
        )).events.onInputUp.add(buyListener = (function(_this){
            return function () {
                _this.buy(10);
            }
        })(this));
        buyButton.add(new SlickUI.Element.Text(0,0, "Buy 10")).center();

        bttnX += bttnW + settings.pad;
        rightPanel.add(buyButton = new SlickUI.Element.Button(
            bttnX,
            rightPanel.height - settings.pad - settings.buttonH,
            bttnW,
            settings.buttonH
        )).events.onInputUp.add((function(_this){
            return function () {
                _this.buy(100);
            }
        })(this));
        buyButton.add(new SlickUI.Element.Text(0,0, "Buy 100")).center();

        bttnX += bttnW + settings.pad;
        rightPanel.add(buyButton = new SlickUI.Element.Button(
            bttnX,
            rightPanel.height - settings.pad - settings.buttonH,
            bttnW,
            settings.buttonH
        )).events.onInputUp.add((function(_this){
            return function () {
                _this.buy(1000);
            }
        })(this));
        buyButton.add(new SlickUI.Element.Text(0,0, "Buy 1000")).center();
    },
    buy: function(amt){
        // purchases the activeItem. (deducts money and adds suppy to inventory)
        // console.log("buy: ", this.activeItem);
        var total = amt * this.activeItem.price;

        if (typeof this.activeItem.key !== 'undefined') {
            var stored = this.data[this.activeItem.key];
            if (amt < 0 && stored > 0) {
                // selling
                this.data[this.activeItem.key] += amt;
                this.data.money -= total;

                // sounds.click.play();
            }
            else if (total <= this.data.money && amt > 0) {
                // buying
                this.data[this.activeItem.key] += amt;
                this.data.money -= total;
                // sounds.click.play();
            }
            else {
                console.log("ERROR: Not enough money or resources!");
            }
        }
        StatusDisplay.update(this.game);
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
