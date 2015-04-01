require('angular');

var app = angular.module('shop', [
    require('ng-hold'),
    require('game')
]);

app.directive("shop", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/shop/shop.html"
    };
});

app.controller("ShopController", ['$scope', 'data', function($scope, data){
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
        if (item.price <= data.money){
            // for consumables:
            if (typeof item.key !== 'undefined') {
                this.data[item.key] += 1
            } else {
                // TODO: apply item some other way
            }
            this.data.money -= item.price;
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
    }
}]);

module.exports = angular.module('shop').name;