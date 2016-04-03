//this is what we need to create new entries in our database
var mongoose = require('mongoose'); //make a new mongoose object

//defining the model for a point in our databse
module.exports = mongoose.model('fishGuidePoint', {
	waterBodyCode: {type: Number, default: 0},
	locName: {type: String, default: ' '},
	geometry: {
		lat: {type: Number, default: 0},
		lng: {type: Number, default: 0},
	},
	species: [{
		code: {type: Number, default: 0},
		name: {type: String, default: ' '},
		lengths: [			
							
		]
	}]
	//just a list of strings, each string is of the form: "55-60cm"
	//defining anything else happens here, make sure you add a comma
	//to the previous line if you're more attributes
});