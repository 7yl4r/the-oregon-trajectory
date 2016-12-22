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
            distance: 0.0,    // distance in AU
            distance_adj: 0.5,  // distance adjustment for gameplay purposes
            landmark: buildLandmark({
                json: require('./landmarks/iss.js'),
                distance: 0.5
            })
        },{
            name: "moon-maneuver",
            // background: undefined,
            // key: undefined,
            distance: 0.0015,
            distance_adj: 1.3,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 1.3015,
                name: 'moon-maneuver'
            })
        },{
            name: "Moon",
            background: "assets/backgrounds/moon.png",
            key: LANDMARK.MOON,
            distance: 0.0015*2,
            distance_adj: 2.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 2.003,
                name: 'Moon Station 1'
            })
        },{
            name: "Mars Maneuver",
            background: undefined,
            distance: 0.0015*2+1.9608,  // 1.9623
            distance_adj: 1.5,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 2.5,
                name: 'mars-maneuver'
            })
        },{
            name: "Mars",
            background: 'assets/backgrounds/mars.png',
            key: LANDMARK.MARS,
            distance: 0.0015*2+1.9608*2,  // 3.9246
            distance_adj: 1.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 4,
                name: 'mars station 1'
            })
        },{
            name: "Ceres Maneuver",
            background: undefined,
            distance: 0.0015*2+1.9608*2+1.6243,  // 5.5489
            distance_adj: 0.5,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 6,
                name: 'ceres maneuver node'
            })
        },{
            name: "Ceres",
            background: 'assets/backgrounds/ceres.png',
            key: LANDMARK.CERES,
            distance: 7.1732,
            distance_adj: 0.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 7,
                name: 'ceres station'
            })
        },{
            name: "Jupiter Maneuver",
            background: undefined,
            distance: 0.0015*2+1.9608*2+1.6243*2+3.2486,  // 10.4218
            distance_adj: -1.5,
            landmark: buildLandmark({
                json: require('./landmarks/maneuver.js'),
                distance: 9,
                name: 'jupiter maneuver node'
            })
        },{
            name: "Jupiter",
            background: 'assets/backgrounds/juipter.png',
            key: LANDMARK.JUPITER,
            distance: 13.6704,
            distance_adj: -2.5,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 11.2,
                name: 'jupiter station 1'
            })
        },{
            name: "Europa",
            background: 'assets/backgrounds/europa.png',
            key: LANDMARK.EUROPA,
            distance: 13.6734,
            distance_adj: -1.0,
            landmark: buildLandmark({
                json: require('./landmarks/station.js'),
                distance: 12.6,
                name: 'europa station (you win)'
            })
        }
    ]
};

function buildLandmark(args){
    // constructs landmark data object
    // json: base json to use for the landmarks
    // all other key-val pairs are added to json and can overload attribs on json.
    var result = {};
    for (var key in args.json){
        result[key] = args.json[key];
    }

    for (var key in args){
        if (key != 'json'){
            result[key] = args[key];
        }
    }
    return result;
}

module.exports = {trajectory: traj, LANDMARK: LANDMARK};
