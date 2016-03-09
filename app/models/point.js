//this is what we need to create new entries in our database
var mongoose = require('mongoose'); //make a new mongoose object

//defining the model for a point in our databse
module.exports = mongoose.model('Point', {
	waterBodyCode: {type: Number, default: 0},
	locName_ENG: {type: String, default: ' '},
	locName_FRE: {type: String, default: ' '},
	specName_ENG: {type: String, default: ' '},
	specName_FRE: {type: String, default: ' '},
	populationTypeID: {type: String, default: ' '},
	populationTypeDESC: {type: String, default: ' '},
	lengthCategoryID: [],
	lengthCategoryLbl: [],
	advLevel: {type: Number, default: ' '},
	advCauseID: {type: Number, default: ' '},
	advCauseDESC: {type: String, default: ' '},
	guideYear: {type: Number, default: ' '},
	guideLocDescription: {type: String, default: ' '},
	geometry: {
		lat: {type: Number, default: 0},
		lng: {type: Number, default: 0}
	}
	//defining anything else happens here, make sure you add a comma
	//to the previous line
});