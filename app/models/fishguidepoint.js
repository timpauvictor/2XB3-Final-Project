//this is what we need to create new entries in our database
var mongoose = require('mongoose'); //make a new mongoose object

//defining the model for a point in our databse
module.exports = mongoose.model('fishGuidePoint', {
	waterBodyCode: {type: String, default: ' '},
	locName: {type: String, default: ' '},
	geometry: {
		lat: {type: String, default: ' '},
		lng: {type: String, default: ' '},
	},
	species: [{
		code: {type: String, default: ' '},
		name: {type: String, default: ' '},
		lengths: [{type: String}]
	}]
	//defining anything else happens here, make sure you add a comma
	//to the previous line if you're more attributes
});