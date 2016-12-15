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

// TODO: merge these into new traj.locations format
// distances in AU
// @distances[@landmarks.ISS] =              0.0010
// @distances[@landmarks.EARTH] =            0.0
// @distances[@landmarks.MANEUVER_MOON] =    0.0015
// @distances[@landmarks.MOON] =             0.0015*2
// @distances[@landmarks.MANEUVER_MARS] =    0.0015*2+1.9608
// @distances[@landmarks.MARS] =             0.0015*2+1.9608*2
// @distances[@landmarks.MANEUVER_CERES] =   0.0015*2+1.9608*2+1.6243
// @distances[@landmarks.CERES] =            0.0015*2+1.9608*2+1.6243*2
// @distances[@landmarks.MANEUVER_JUPITER] = 0.0015*2+1.9608*2+1.6243*2+3.2486
// @distances[@landmarks.JUPITER] =          0.0015*2+1.9608*2+1.6243*2+3.2486*2
// @distances[@landmarks.EUROPA] =           0.0015*2+1.9608*2+1.6243*2+3.2486*2+.003

// @dist_adjustments = {}  # use these to move locations for gameplay reasons
// # calculations to come to these numbers from this spreadsheet:
// # https://docs.google.com/spreadsheets/d/1xrVJzQhPNw9-6lNZPf_-sr50t_ECjgUU8BIYq2M84ok/edit?usp=sharing
// @dist_adjustments[@landmarks.EARTH] =             0.1
// @dist_adjustments[@landmarks.MANEUVER_MOON] =     1.3
// @dist_adjustments[@landmarks.MOON] =              2.0
// @dist_adjustments[@landmarks.MANEUVER_MARS] =     1.5
// @dist_adjustments[@landmarks.MARS] =              1.0
// @dist_adjustments[@landmarks.MANEUVER_CERES] =    0.5
// @dist_adjustments[@landmarks.CERES] =             0.0
// @dist_adjustments[@landmarks.MANEUVER_JUPITER] = -1.5
// @dist_adjustments[@landmarks.JUPITER] =          -2.5
// @dist_adjustments[@landmarks.EUROPA] =           -1.0


traj = {
    locations:[  // should be in order of encounter
        {
            name: "Earth",
            background: "assets/backgrounds/bg.png",
            key: LANDMARK.EARTH,
            distance: 0,
            distance_adj: 0.1,
            landmark: require('./landmarks/iss.js')  // TODO: buildLandmark(require('./landmarks/iss.js'), LANDMARK.EARTH)
        },{
            name: "moon-maneuver",
            background: undefined,
            distance: 0.0015,
            distance_adj: 1.3,
            landmark: require('./landmarks/maneuver.js')
        },{
            name: "Moon",
            background: "assets/backgrounds/moon.png",
            distance: 0.0015*2,
            distance_adj: 2.0,
            landmark: require('./landmarks/station.js')
        }
    ]
};

// make adjustments to loaded template landmarks
traj.locations[1].landmark.name = 'moon-maneuver-node';

module.exports = {trajectory: traj, LANDMARK: LANDMARK};
