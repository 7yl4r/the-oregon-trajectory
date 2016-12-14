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

traj = {
    locations:[  // should be in order of encounter
        {
            name: "Earth",
            background: "assets/backgrounds/bg.png",
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
