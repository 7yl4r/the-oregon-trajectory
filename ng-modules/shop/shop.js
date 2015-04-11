require('angular');
Howl = require('howler');
Nodule = require('nodule');

var app = angular.module('shop', [
    require('ng-hold'),
    require('game'),
    require('game-btn')
]);

app.directive("shop", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/shop/shop.html"
    };
});

app.controller("ShopController", ['$scope', '$rootScope', 'data', function($scope, $rootScope, data){

    this.data = data;
    this.item_consumables = [
        {
            name: 'Rocket Fuel',
            description: "You won't get very far without this.",
            price: 2,
            image: data.gameDir + "/assets/Flat-UI-master/img/icons/png/Infinity-Loop.png",
            key: "fuel"
        },{
            name: 'Rations',
            description: "Not just freeze-dried ice cream.",
            price: 1,
            image: data.gameDir + "/assets/Flat-UI-master/img/icons/png/Infinity-Loop.png",
            key: "rations"
        }
    ];
    this.tab = 1;
    this.activeItem = this.item_consumables[0];

    this.buy = function(){
        var amt = parseInt(document.getElementById(this.activeItem.key).value);
        var total = amt * this.activeItem.price;

        if (typeof this.activeItem.key !== 'undefined') {
            var stored = this.data[this.activeItem.key];
            if (amt < 0 && stored > 0) {
                // selling
                this.data[this.activeItem.key] += amt;
                this.data.money -= total;
                var sound = new Howl({
                    urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
                });
                sound.play();
            }
            else if (total <= data.money && amt > 0) {
                // buying
                this.data[this.activeItem.key] += amt;
                this.data.money -= total;
                var sound = new Howl({
                    urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
                });
                sound.play();
            }
            else {
                console.log("ERROR: Not enough money or resources!");
            }
        }
    };

    this.isSet = function(checkTab) {
        return this.tab === checkTab;
    };

    this.setTab = function(activeTab) {
        this.tab = activeTab;
    };

    this.setActiveItem = function(itemName) {
        for (var i = 0; i < this.item_consumables.length; i++) {
            var item = this.item_consumables[i];
            if (itemName == item.name) this.activeItem = item;
        }
    };

    this.ifItemActive = function(itemName) {
        if (itemName == this.activeItem.name) {
            return "item-container-selected";
        }
        return '';
    };

    this.toSpace = function(){
        var sound = new Howl({
            urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
        });
        sound.play();
        $scope.$emit('switchToModule', 'travel-screen');
    };

    this.onEntry = function() {
        var greetingsOgg = [];
        greetingsOgg.push("assets/sound/effects/shop/F1BePrepared.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F1EverythingYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F1Hey.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F1StockUp.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F1WhatDoYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F1WhatDoYouWant.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F1BePrepared.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F2EverythingYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F2Hey.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F2StockUp.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F2WhatDoYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/F2WhatDoYouWant.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M1BePrepared.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M1EverythingYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M1Hey.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M1StockUp.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M1WhatDoYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M1WhatDoYouWant.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M2BePrepared.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M2EverythingYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M2Hey.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M2StockUp.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M2WhatDoYouNeed.ogg");
        greetingsOgg.push("assets/sound/effects/shop/M2WhatDoYouWant.ogg");

        var greetingsMP3 = [];
        greetingsMP3.push("assets/sound/effects/shop/F1BePrepared.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F1EverythingYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F1Hey.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F1StockUp.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F1WhatDoYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F1WhatDoYouWant.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F1BePrepared.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F2EverythingYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F2Hey.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F2StockUp.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F2WhatDoYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/F2WhatDoYouWant.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M1BePrepared.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M1EverythingYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M1Hey.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M1StockUp.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M1WhatDoYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M1WhatDoYouWant.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M2BePrepared.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M2EverythingYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M2Hey.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M2StockUp.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M2WhatDoYouNeed.mp3");
        greetingsMP3.push("assets/sound/effects/shop/M2WhatDoYouWant.mp3");

        var rand = Math.random();
        var index = Math.floor(rand * (greetingsOgg.length - 1));
        var sound = new Howl({
            urls: [greetingsOgg[index], greetingsMP3[index]]
        });
        sound.play();
    };

    this.nodule = new Nodule($rootScope, 'shop', this.onEntry);
}]);

module.exports = angular.module('shop').name;