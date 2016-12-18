LANDMARK = {  // landmark keys dict (use it like an enum)
    EARTH: 'earth',
    ISS: 'iss',
    MANEUVER_MOON: 'moon-maneuver',
    MOON: 'moon',
    MANEUVER_MARS: 'mars-maneuver',
    MARS: 'mars',
    MANEUVER_CERES: 'ceres-maneuver',
    CERES: 'ceres',
    MANEUVER_JUPITER: 'jupiter-maneuver',
    JUPITER: 'jupiter',
    EUROPA: 'europa'
}

// # calculations to come to distance numbers from this spreadsheet:
// # https://docs.google.com/spreadsheets/d/1xrVJzQhPNw9-6lNZPf_-sr50t_ECjgUU8BIYq2M84ok/edit?usp=sharing


traj = {
    meta: {
        travelTime: 5,
        totalDistance: 13.67
    },
    locations:[  // should be in order of encounter
        {
            name: "Earth",
            background: "assets/backgrounds/bg.png",
            key: LANDMARK.EARTH,
            distance: 0,    // distance in AU
            distance_adj: 0.1,  // distance adjustment for gameplay purposes
            landmark: buildLandmark({
                json: require('./landmarks/iss.js'),
                distance: 0.2
            })
        },{
            name: "moon-maneuver",
            background: undefined,
            distance: 0.0015,
            distance_adj: 1.3,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 1.3015
            })
        },{
            name: "Moon",
            background: "assets/backgrounds/moon.png",
            distance: 0.0015*2,
            distance_adj: 2.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 2.003
            })
        },{
            name: "Mars Maneuver",
            background: undefined,
            distance: 0.0015*2+1.9608,  // 1.9623
            distance_adj: 1.5,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 1.97
            })
        },{
            name: "Mars",
            background: 'assets/backgrounds/mars.png',
            distance: 0.0015*2+1.9608*2,  // 3.9246
            distance_adj: 1.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 4
            })
        },{
            name: "Ceres Maneuver",
            background: undefined,
            distance: 0.0015*2+1.9608*2+1.6243,  // 5.5489
            distance_adj: 0.5,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 6
            })
        },{
            name: "Ceres",
            background: 'assets/backgrounds/ceres.png',
            distance: 7.1732,
            distance_adj: 0.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 7
            })
        },{
            name: "Jupiter Maneuver",
            background: undefined,
            distance: 0.0015*2+1.9608*2+1.6243*2+3.2486,  // 10.4218
            distance_adj: -1.5,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 9
            })
        },{
            name: "Jupiter",
            background: 'assets/backgrounds/juipter.png',
            distance: 13.6704,
            distance_adj: -2.5,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 11.2
            })
        },{
            name: "Europa",
            background: 'assets/backgrounds/europa.png',
            distance: 13.6734,
            distance_adj: -1.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 12.6
            })
        }
    ]
};

// make adjustments to loaded template landmarks
traj.locations[1].landmark.name = 'moon-maneuver-node';

function buildLandmark(args){
    // constructs landmark data object
    // json: base json to use for the landmarks
    // all other key-val pairs are added to json and can overload attribs on json.
    var result = args.json;
    for (var key in args){
        if (key != 'json'){
            result[key] = args[key];
        }
    }
    return result;
}

module.exports = {trajectory: traj, LANDMARK: LANDMARK};
