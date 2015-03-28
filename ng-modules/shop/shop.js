require('angular');

var app = angular.module('shop', []);

app.directive("shop", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/shop/shop.html"
    };
});

app.controller("ShopController", ['$scope', 'data', function($scope, data){
    this.tab = 1;

    this.isSet = function(checkTab) {
        return this.tab === checkTab;
    };

    this.setTab = function(activeTab) {
        this.tab = activeTab;
    };

    this.item_consumables = [
        {
            name: 'Rocket Fuel',
            description: "Placeholder text",
            price: 1,
            image: ""},
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