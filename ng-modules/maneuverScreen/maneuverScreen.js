require('angular');

var app = angular.module('maneuver-screen', []);

app.directive("maneuver-screen", function() {
  return {
    restrict: 'E',
    templateUrl: "ng-modules/maneuverScreen/maneuverScreen.html"
  };
});

app.controller('ManeuverScreenCtrl', function($scope){
  $scope.choices = [
    {
      'text': 'Take the high path',
      'response': function(){console.log('Chose "Take the high path"')}
    },
    {
      'text': 'Take the low path',
      'response': function(){console.log('Chose "Take the low path"')}
    }
  ];

  //background image

  //title
});

module.exports = angular.module('maneuver-screen').name;
