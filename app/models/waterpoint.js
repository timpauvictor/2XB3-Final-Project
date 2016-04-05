var mongoose = require('mongoose');

module.exports = mongoose.model('waterPoint', {
	stationCode: {type: String},
	stationLoc: {type: String},
	geometry: {
		lat: {type: Number},
		lng: {type: Number}
	},
	dailyLevels: [{type: Number}],
	dailyDischarge: [{type: Number}]
});