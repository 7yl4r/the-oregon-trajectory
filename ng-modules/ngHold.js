/*
 angular directive: repeat action while mouse is clicked down for a long period of time
 and until the mouse is released.

 To use: (after adding code dependency of course)
 <button ng-hold="foo()" ng-hold-interval="1000;1,200;10;100;10,20" ng-hold-done="bar()">

 ng-hold-interval syntax = interval,interval,interval...
 interval = delay;count | delay

 count for last interval is not used. if count isn't specified default is 1.
 delay is in milliseconds.

 thus: 1000;1,200;10;100;10,20 means:
 1) first single delay of 1000ms
 2) then 10 delays of 200ms
 3) then 10 delays of 100ms
 4) then endless delays of 20ms

 ng-hold-done attr event can be used to finalize stuff - will be called as last call after ng-hold calls ended.

 events stop once mouse is released or element is exited.
 last event call is the ng-hold-done.

 based on: https://gist.github.com/srfrnk/9641a310d3e6092ca28b
 */
require('angular');

var app = angular.module("directives/ngHold", []);

app.directive('ngHold', [function () {
    return {
        restrict: "A",
        link: function (scope, elm, attrs) {

        },
        controller: ["$scope", "$element", "$attrs", "$transclude", "$timeout", function ($scope, $element, $attrs, $transclude, $timeout) {
            var onHold = function () {
                return $scope.$eval($attrs.ngHold);
            };
            var onDone = function () {
                return $scope.$eval($attrs.ngHoldDone);
            };

            var intervals = [];
            ($attrs.ngHoldInterval || "500").split(",").forEach(function (interval) {
                intervals.push(interval.split(";"));
            });
            var timeout=null;
            var intervalIdx;
            var intervalCount;

            function timeoutFoo() {
                intervalCount++;
                var max = intervals[intervalIdx].length == 1 ? 1 : intervals[intervalIdx][1];
                if (intervalCount > max) {
                    intervalIdx = Math.min(intervalIdx + 1, intervals.length - 1);
                    intervalCount = 1;
                }
                timeout = $timeout(timeoutFoo, intervals[intervalIdx][0]);
                onHold();
            }

            $element.on("mousedown", function (e) {
                intervalIdx = 0;
                intervalCount = 1;
                timeout = $timeout(timeoutFoo, intervals[intervalIdx][0]);
                $scope.$apply(onHold);
            });
            $element.on("mouseup", function (e) {
                if (!!timeout) {
                    $timeout.cancel(timeout);
                    $scope.$apply(onDone);
                    timeout=null;
                }
            });
            $element.on("mouseleave", function (e) {
                if (!!timeout) {
                    $timeout.cancel(timeout);
                    $scope.$apply(onDone);
                    timeout=null;
                }
            });
        }]
    };
}]);

module.exports = angular.module('directives/ngHold').name;