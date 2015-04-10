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

    this.buy = function(item){
        var amt = parseInt(document.getElementById(item.key).value);
        var total = amt * item.price;
        if (total <= data.money){
            // for consumables:
            if (typeof item.key !== 'undefined') {
                this.data[item.key] += amt;
            } else {
                // TODO: apply item some other way
            }
            this.data.money -= total;
            var sound = new Howl({
                urls: ['assets/sound/effects/select/select.ogg', 'assets/sound/effects/select/select.mp3']
            });
            sound.play();
        } else {
            ; // not enough money to buy!
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
        var greetings = [];
        greetings.push("assets/sound/effects/shop/F1BePrepared.wav");
        greetings.push("assets/sound/effects/shop/F1EverythingYouNeed.wav");
        greetings.push("assets/sound/effects/shop/F1Hey.wav");
        greetings.push("assets/sound/effects/shop/F1StockUp.wav");
        greetings.push("assets/sound/effects/shop/F1WhatDoYouNeed.wav");
        greetings.push("assets/sound/effects/shop/F1WhatDoYouWant.wav");
        greetings.push("assets/sound/effects/shop/F1BePrepared.wav");
        greetings.push("assets/sound/effects/shop/F2EverythingYouNeed.wav");
        greetings.push("assets/sound/effects/shop/F2Hey.wav");
        greetings.push("assets/sound/effects/shop/F2StockUp.wav");
        greetings.push("assets/sound/effects/shop/F2WhatDoYouNeed.wav");
        greetings.push("assets/sound/effects/shop/F2WhatDoYouWant.wav");
        greetings.push("assets/sound/effects/shop/M1BePrepared.wav");
        greetings.push("assets/sound/effects/shop/M1EverythingYouNeed.wav");
        greetings.push("assets/sound/effects/shop/M1Hey.wav");
        greetings.push("assets/sound/effects/shop/M1StockUp.wav");
        greetings.push("assets/sound/effects/shop/M1WhatDoYouNeed.wav");
        greetings.push("assets/sound/effects/shop/M1WhatDoYouWant.wav");
        greetings.push("assets/sound/effects/shop/M2BePrepared.wav");
        greetings.push("assets/sound/effects/shop/M2EverythingYouNeed.wav");
        greetings.push("assets/sound/effects/shop/M2Hey.wav");
        greetings.push("assets/sound/effects/shop/M2StockUp.wav");
        greetings.push("assets/sound/effects/shop/M2WhatDoYouNeed.wav");
        greetings.push("assets/sound/effects/shop/M2WhatDoYouWant.wav");

        var rand = Math.random();
        var index = Math.floor(rand * (greetings.length - 1));
        var sound = new Howl({
            urls: [greetings[index]]
        });
        sound.play();
    };

    this.nodule = new Nodule($rootScope, 'shop', this.onEntry);
}]);

module.exports = angular.module('shop').name;