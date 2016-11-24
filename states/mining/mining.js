mining = function(game){
    console.log('starting game state : mining')
}

mining.prototype = {
	preload: require('./preload'),
  	create: require('./create'),
    render: require('./render'),
    update: require('./update')
}

module.exports = mining
