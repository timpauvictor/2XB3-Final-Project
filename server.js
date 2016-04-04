//server.js 
//modules =======================================================
var express = require('express'); 				//require express to use app. functions
var app = express(); 							//instantiate app
var bodyParser = require('body-parser'); 		//let's us parse body requests
var methodOverride = require('method-override');//let's us override methods
var mongoose = require('mongoose'); 			//mongoDB wrapper

//config ==============================================

var db = require('./config/db.js'); //database config file

var port = process.env.PORT || 8080; //defining our port

mongoose.connect("mongodb://default:default@ds023398.mlab.com:23398/xb3-final-db"); //connecting to mongo with my default user

//get all data of the body (post) parameters
//parsing application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app); // location of our routes definition

app.listen(port); //start listening

console.log("Listening on port: " + port);

//expose our app
exports = module.exports = app;