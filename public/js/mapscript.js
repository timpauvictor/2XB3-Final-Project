var __zoomLevel = 4;          // the amount of zoom we're at
var fishPoints = [];          // an array to store all fish points, this is used for toggling them on and off
var __startingCoords = [52.8834037, -108.4173503]
var __map;
var waterPoints = [];

function loadMap() {                                         // initial function to load our map in to the div
__map = L.map("map").setView(__startingCoords, __zoomLevel); // inits a map with the given start coords and
console.log('map created');                                  // console log that we've created a map
L.esri.basemapLayer("Topographic").addTo(__map);             // load up esri's tile layers, in this case it's called "topographic"
console.log('topographic layer added');                      // log to the console that this has been done
}

function getWaterPoints() { //function that makes a get request for all of our water points
	console.log("Attempting to get points"); //log that we're attempting a get request
	var jQueryPromise = $.get('http://localhost:8080/api/waterPoints', { //make a new variable that store the get request object, this doesn't resolve it
		dataType: "jsonp" //necessary to play nicely with newer version of node
	});
	var realPromise = Promise.resolve(jQueryPromise); //realPromise is another variable that gets created with a trigger on when the problem resolves
	realPromise.then(function(val) { //when it gets triggered
		plotWaterPoints(val); //call a new function to place the points on the map
	});
}

function plotWaterPoints(points) { //a function which makes the maekrs for all the points we got
	for (var i = 0; i < points.length; i++) { //iterate through all the points
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng]).addTo(__map); //for each one, get it's latitude and longitude and plot it
		marker.on('click', waterClick); //make a new event listener for our marker such that whenever it is clicked, it calls the function waterClick, it sends an event object as arguments (e)
		waterPoints.push(marker); //push the new marker we made into our array of water points
	}
}

function waterClick(e) { //function to handle any clicks on a waterPoint
	//console.log("water point clicked");
	//console.log([e.latlng.lat, e.latlng.lng]);
	graphInit([e.latlng.lat, e.latlng.lng]); //this function is located in ./graphscript.js
	console.log("Finished graphInit");
	document.getElementById('light').style.display='block'; //get our div element called light and display it (this is the 'popup')
	document.getElementById('fade').style.display='block'; //get our fade and display it (this is what causes the background to fade to black)
}

function plotWaterPoints(points) {
	for (var i = 0; i < points.length; i++) {
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng]).addTo(__map);
		// console.log(points[i].stationCode);
		// marker.bindPopup(points[i].stationCode);
		marker.on('click', waterClick);
		waterPoints.push(marker);
	}
}

function getFishPoints() {
	console.log("Attempting to get all points");
	var jQueryPromise = $.get('http://localhost:8080/api/fishPoints', { //however, this has a different URL so we get all the fish points instead
		dataType: "jsonp"
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		plotFishPoints(val);
	});
}

function plotFishPoints(points) { //identical to the earlier function
	for (var i = 0; i < points.length; i++) {
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng]).addTo(__map);
		makeFishPointPopup(points[i], marker); //except we make a popup for each one as opposed to having an onclick event
		fishPoints.push(marker); //and we add it to a different array
	}
}

function makeFishPointPopup(point, marker) { //function to make the popup for a given marker and point
	var string = ""; //new empty string
	string = "<b>Name: </b>" 				+ point.locName 				        + "<br>" 
		+ 	"<b>Description: </b>" 		+ ""				+ "<br>"
		+ 	"<b>Species: </b>" 			  + prettySpecies(point.species); + "<br>"; //adds the name, description and species located there to the popup
	marker.bindPopup(string);//make a new popup for our marker with the string we just made
}

function prettySpecies(species) {                                         // function to print the species all pretty
  var stringToReturn = "<ul>";                                              // initially start a list in html
   for (var i = 0; i < species.length; i++) {                                // parse through the species
    stringToReturn += "<li>" + species[i].name + "</li>";                     // add the species name to the list
    for (var j = 0; j < species[i].lengths.length; j++) {                     // parse through all of the lengths for the species
      stringToReturn += "<ul><li>" + species[i].lengths[j] + "</li></ul>"; // add the lengths to the string
		}
	}
		stringToReturn += "</ul></ul>" //finish off the last tables
		return stringToReturn; //return it
}

loadMap();        // call load map
getFishPoints();  // get our fish points and plot them
getWaterPoints(); // get our water points and plot them


