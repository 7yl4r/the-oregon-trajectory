
require('angular')

app = angular.module('score', [])

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.factory('leaderboard', ['$http', function($http) {
    var board = {
        STORAGE_KEY: "oregon-traj-highscores"
    }

    board.supports_html5_storage = function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    board.getDefaultScores = function(){
        return [
            {
                "name":"7yl4r",
                "score":"101",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:05:23 PM"
            },{
                "name":"terpin",
                "score":"72072344",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:05:39 PM"
            },{
                "name":"bearikson",
                "score":"234",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            },{
                "name":"anita",
                "score":"5515",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            },{
                "name":"groupsky",
                "score":"912937859",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            },{
                "name":"jesus_vidal",
                "score":"834",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            },{
                "name":"jharrisonmusic",
                "score":"7515",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            },{
                "name":"jrodManU",
                "score":"426",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            },{
                "name":"Ben Nubbin",
                "score":"78921",
                "seconds":"0",
                "text":null,
                "date":"4/18/2015 5:06:07 PM"
            }
        ];
    }

    board.passTopScoresTo = function(callback){
    // gets top scores and passes the json to callback when ready
        var scores;
        if (board.supports_html5_storage()){
            scores = JSON.parse(localStorage[board.STORAGE_KEY]);
            if (typeof scores === 'undefined'){
                scores = board.getDefaultScores();
                localStorage[board.STORAGE_KEY] = JSON.stringify(scores);
            }
        } else {
            scores = board.getDefaultScores();
        }

        callback(scores);
        // using dreamlo: (fails due to XSS issue) TODO: use this
        //KEY = "544ebd896e51b60d48cd5fa3";
        //$http.get("http://dreamlo.com/lb/"+KEY+"/json-dec").success(callback);
    }
    return board
}]);

module.exports = angular.module('score').name
