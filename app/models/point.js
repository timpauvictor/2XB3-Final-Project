//this is what we need to create new entries in our database
var mongoose = require('mongoose'); //make a new mongoose object

//defining the model for a point in our databse
module.exports = mongoose.model('Point', {
	name: {type: String, default: ' '},
	description: {type: String, default: ' '},
	geometry: {
		lat: {type: Number, default: 0},
		lng: {type: Number, default: 0}
	//defining anything else happens here, make sure you add a comma
	//to the previous line
	}
});