require('angular');

var app = angular.module('shop', [
    require('ng-hold'),
    require('game')
]);

app.directive("shop", function() {
    return {
        restrict: 'E',
        templateUrl: "/the-oregon-trajectory/ng-modules/shop/shop.html"
    };
});

app.controller("ShopController", ['$scope', 'data', function($scope, data){
    this.tab = 1;
    this.data = data;

    this.isSet = function(checkTab) {
        return this.tab === checkTab;
    };

    this.setTab = function(activeTab) {
        this.tab = activeTab;
    };

    this.buy = function(item){
        // for consumables:
        if (typeof item.key !== 'undefined') {
            this.data[item.key] += 1
        } else {
            // TODO: apply item some other way
            ;
        }
        this.data.money -= item.price;
    }

    this.item_consumables = [
        {
            name: 'Rocket Fuel',
            description: "You won't get very far without this.",
            price: 1,
            image: "",
            key: "fuel"
        },{
            name: 'Rations',
            description: "Not just freeze-dried ice cream.",
            price: 1,
            image: "",
            key: "rations"
        }
        /*
        {
            name: 'Life Support',
            description: "Placeholder text",
            price: 2,
            image: ""},
        {
            name: 'Food',
            description: "Placeholder text",
            price: 3,
            image: ""},
        {
            name: 'Water',
            description: "Placeholder text",
            price: 4,
            image: ""},
        {
            name: 'Drill Bit',
            description: "Placeholder text",
            price: 5,
            image: ""},
        {
            name: 'Spare Engine',
            description: "Placeholder text",
            price: 6,
            image: ""}
            */
    ];

    this.item_mods = [
        {
            name: 'Rocket Payload 1',
            description: "Placeholder text",
            price: 1,
            image: ""},
        {
            name: 'Rocket Payload 2',
            description: "Placeholder text",
            price: 1,
            image: ""},
        {
            name: 'Rocket 1',
            description: "Placeholder text",
            price: 1,
            image: ""},
        {
            name: 'Rocket 2',
            description: "Placeholder text",
            price: 1,
            image: ""}
    ];
}]);

module.exports = angular.module('shop').name;
