require('angular')
Howl = require('howler')    # for sounds (if you need them)
Nodule = require('nodule')  # for nodule helpers

app = angular.module('trader', [
    require('game-btn')
]);

app.directive("trader", () ->
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/trader/trader.html"
    }
)

app.controller("traderController", ['data', '$scope', '$rootScope', (data, $scope, $rootScope) ->
    @data = data
    @onEntry = ()=>
        @tradeOptions = @getRandomTradeOptions()
        @stationName = @getRandomName()

    @nodule = new Nodule($rootScope, 'trader', @onEntry);

    @getRandomTradeOptions = ()=>
        return [
            {
                text: "we've got plenty of food to go around",
                summary: "trade 100 fuel for 1000 food",
                action: ()=>
                    @data.fuel -= 100
                    @data.rations += 1000
            },{
                text: "we could use a little fuel for orbital corrections",
                summary: "trade 100 fuel for 1000 spacecoin",
                action: ()=>
                    @data.fuel -= 100
                    @data.money += 1000
            }
        ]

    @getRandomName = ()=>
        names = [
            "station alpha",
            "station omega",
            "Hal 1001",
            "New Florida",
            "Solice",
            "LaGrange's Range",
            "Newton-town",
            "Hubble's Hangout",
            "A1803f",
            "0000001000100101",
            "station 1337",
            "The Enterprise",
            "The Cosmodonut"
        ]
        @stationName = names[Math.floor(Math.random() * names.length)];

    @selectOption = (option)=>
        option.action()
        @leave()

    @leave = ()=>
        # leave the station
        $scope.$emit('switchToModule', 'travel-screen');
])

module.exports = angular.module('trader').name