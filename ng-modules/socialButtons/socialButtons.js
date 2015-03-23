require('angular');

var app = angular.module('social-button-directive', []);

app.controller("trustyUrl", ['$sce', '$scope', function($sce, $scope) {
    $scope.trustSrc = function(url){
        return $sce.trustAsResourceUrl(url);
    }
}]);
app.directive("socialButtons", function() {
    return {
        restrict: 'AE',
        templateUrl: "ng-modules/socialButtons/socialButtons.html",
        scope: {
            ghForkBtn:'@',
            ghWatchBtn:'@',
            twitter:'@',
            gplus:'@'
        },
        link: function($scope, $el, $attr){

            // twitter
            !function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "//platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, "script", "twitter-wjs");

            // g+
            (function () {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        }
    };
});

module.exports = angular.module('social-button-directive').name;