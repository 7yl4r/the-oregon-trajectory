# jquery must be loaded before this...
require('angular')
require('fastclick')
require('howler')

# show warning before navigating from the page
window.onbeforeunload = () ->
    return 'You will lose your progress!'

# "main" controller
`
// WARN: do not change this next line unless you update newModule.py as well!
var app = angular.module('the-oregon-trajectory', [
        require('audio-controls'),
        require('maneuver-screen'),
        require('game-over'),
        require('ui.bootstrap'),
        require('ngTouch'),
        require('header-navbar'),
        require('splash-header'),
        require('app-footer'),
        require('main-menu'),
        require('shop'),
        require('you-win'),
        require('travel-screen')
    ], function($httpProvider){
        FastClick.attach(document.body);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
);

app.controller('MainCtrl', ['$scope', '$modal', function($scope, $modal){
    var vm = this;
    vm.active_module = 'main-menu';

    vm.MSPF = 100;  // ms per frame

    vm.music = new Howl({
        urls: ['assets/sound/music/theme/theme.mp3', 'assets/sound/music/theme/theme.ogg']
    });
    vm.music.play();

    vm.musicVol = 0.9;
    vm.MUSIC_FADE_TIME = 300;

    vm.changeMusicTo = function(event, newMusicObj){
        console.log('switching music to', newMusicObj, 'from', vm.music);
        vm.music.fadeOut(0, vm.MUSIC_FADE_TIME);
        //vm.music.stop();

        newMusicObj.fadeIn(vm.musicVol, vm.MUSIC_FADE_TIME);
        vm.music = newMusicObj;
        // keep reference to playing music

//        newMusicObj.play();
//        vm.music.play();
//        vm.music.fadeIn({"to":vm.musicVol, "duration":vm.MUSIC_FADE_TIME});
    }
    $scope.$on('changeMusicTo', vm.changeMusicTo);

    //vm.submodules = [];  // secondary modules which are also active (NYI)
    vm.switchToModule = function(event, newModuleName){
        // enables switching between modules
        vm.active_module = newModuleName;

        // had to use jquery here... b/c I'm not angulicious enough
        var active_element = $(newModuleName);
        if(active_element.length === 0){
            throw Error('game module ' + newModuleName + ' not found in DOM!');
        } else {
            $('.game-module').hide();
            active_element.show();
            $("html, body").animate({ scrollTop: 0 }, "fast");
        }
    }
    $scope.$on('switchToModule', vm.switchToModule);  // module switching via events

    vm.moduleIsActive = function(magicStr){
        // returns true if module identified by magicStr should be active currently
        if (magicStr === vm.active_module){
            return true
        } else {  // TODO: check for submodules
            return false
        }
    }

    // this example is retained here for later use
    /*
    $scope.showDownloadModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'downloadModal.html',
            controller: 'DownloadCtrl'
        });
    };
    */

    vm.scheduleDraw = function(){
        $scope.$broadcast('draw');
        setTimeout(function(){vm.scheduleDraw()}, 1/vm.MSPF);
    }
    vm.switchToModule({}, 'main-menu');  // init app by starting main menu
    vm.scheduleDraw();  // do first draw
}]);

/*
 * The following compatibility check is from:
 *
 * Bootstrap Customizer (http://getbootstrap.com/customize/)
 * Copyright 2011-2014 Twitter, Inc.
 *
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */
var isOldBrowser;
(function () {

    var supportsFile = (window.File && window.FileReader && window.FileList && window.Blob);
    function failback() {
        isOldBrowser = true;
    }
    /**
     * Based on:
     *   Blob Feature Check v1.1.0
     *   https://github.com/ssorallen/blob-feature-check/
     *   License: Public domain (http://unlicense.org)
     */
    var url = window.webkitURL || window.URL; // Safari 6 uses "webkitURL".
    var svg = new Blob(
        ['<svg xmlns=\'http://www.w3.org/2000/svg\'></svg>'],
        { type: 'image/svg+xml;charset=utf-8' }
    );
    var objectUrl = url.createObjectURL(svg);

    if (/^blob:/.exec(objectUrl) === null || !supportsFile) {
        // URL.createObjectURL created a URL that started with something other
        // than "blob:", which means it has been polyfilled and is not supported by
        // this browser.
        failback();
    } else {
        angular.element('<img/>')
            .on('load', function () {
                isOldBrowser = false;
            })
            .on('error', failback)
            .attr('src', objectUrl);
    }

})();
`
