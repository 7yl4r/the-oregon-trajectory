# same as exampleModule.js, but in coffeescript WARN: untested

require('angular')
Nodule = require('nodule')  # for nodule helpers

# init the angular app
app = angular.module('example-module', []);

# set up the "directive" to connect html view to this
app.directive("exampleModule", () ->
    return {
        restrict: 'E',
        templateUrl: "ng-modules/exampleModule/exampleModule.html"
    }
)

# set up the actual controller
app.controller("exampleController", ['data', '$scope', '$rootScope', (data, $scope, $rootScope) ->
    # use vm (short for "virtual model") to keep a reference
    @exampleProperty = "before entry"

    @onEnter = () =>
        # runs when the module is brought into player view
        @exampleProperty = "after entry"


    # nodule helps attach init. and teardown functions to events (and a few other things)
    @nodule = new Nodule($rootScope, 'example-module', @onEntry)

    @buttonClick = ()=>
        # this function is triggered by the button
        @exampleProperty = "after click"
]);

# this is needed to connect with the main app.
module.exports = angular.module('example-module').name