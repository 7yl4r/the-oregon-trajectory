require('angular');

var app = angular.module('travel-screen', []);

app.directive("travelScreen", function() {
    return {
        restrict: 'E',
        templateUrl: "/ng-modules/travelScreen/travelScreen.html"
    };
});

window.drawBg = function() {
    var c = document.getElementById("travelCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);
}

module.exports = angular.module('travel-screen').name;