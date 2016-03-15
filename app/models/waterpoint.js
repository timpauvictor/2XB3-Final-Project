var mongoose = require('mongoose');

module.exports = mongoose.model('waterPoint', {
	stationCode: {type: String},
	geometry: {
		lat: {type: Number},
		lng: {type: Number}
	},
	dailyLevels: [{type: Number}],
	hourlyLevels: [{type: Number}],
});