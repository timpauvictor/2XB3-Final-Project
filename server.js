//server.js 
//modules =======================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

//config ==============================================

var db = require('./config/db.js');

var port = process.env.PORT || 8080;

//connect to mongo later
mongoose.connect("mongodb://default:default@ds023398.mlab.com:23398/xb3-final-db");

//get all data of the body (post) parameters
//parsing application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

require('./app/routes')(app); // configure our routes

app.listen(port);

console.log("Listening on port: " + port);

//expose our app
exports = module.exports = app;