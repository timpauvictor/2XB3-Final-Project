var __zoomLevel = 6;          // the amount of zoom we're at
var fishPoints = [];          // an array to store all fish points, this is used for toggling them on and off
var __startingCoords = [51.2538, -85.3232]
var __map;
var waterPoints = [];
var fishClusters = L.markerClusterGroup({
	disableClusteringAtZoom: 10
});
var waterClusters = L.markerClusterGroup({
	disableClusteringAtZoom: 10,
	iconCreateFunction: function(cluster) { //we override the original function so we can set up custom css rules
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'small-water';
		} else if (childCount < 100) {
			c += 'medium-water';
		} else {
			c += 'large-water';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	}
});
var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var myTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
var listData = [{}];

function loadMap() {                                         // initial function to load our map in to the div
	__map = L.map("map").setView(__startingCoords, __zoomLevel); // inits a map with the given start coords and
	console.log('map created');                                  // console log that we've created a map
	L.esri.basemapLayer("Topographic").addTo(__map);             // load up esri's tile layers, in this case it's called "topographic"
	console.log('topographic layer added');                     // log to the console that this has been done
}

function getWaterPoints() { //function that makes a get request for all of our water points
	console.log("Attempting to get points"); //log that we're attempting a get request
	var jQueryPromise = $.get('http://localhost:8080/api/waterPoints', { //make a new variable that store the get request object, this doesn't resolve it
		dataType: "jsonp" //necessary to play nicely with newer version of node
	});
	var realPromise = Promise.resolve(jQueryPromise); //realPromise is another variable that gets created with a trigger on when the problem resolves
	realPromise.then(function(val) { //when it gets triggered
		// console.log(val);
		plotWaterPoints(val); //call a new function to place the points on the map
	});
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
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng], {icon: redIcon}).addTo(__map);
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
		// console.log(val);
		plotFishPoints(val);
		addToList(val);
	});
}



function zoomLocCode(code) {
	console.log("Attempting to find a matching piece of data for code:" + code);
	var jQueryPromise = $.post("http://localhost:8080/api/fishPointCode", {
		"code": code
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		console.log("Match found");
		__map.setView([Number(val.lat), Number(val.lng)], 15);
		popPopup(val.lat, val.lng);
	});
}

function popPopup(lat, lng) {
	for (var i = 0; i < fishPoints.length; i++) {
		if (fishPoints[i]._latlng.lat === Number(lat) && fishPoints[i]._latlng.lng === Number(lng)) {
			console.log("matched popup");
			fishPoints[i].openPopup();
			return;
		}
	}
}

function addToList(points) {
	for (var i = 0; i < points.length; i++) {
		insertRow(points[i].waterBodyCode, points[i].locName, makeSpeciesArr(points[i].species))
	}
}

function makeSpeciesArr(specs) {
	toReturn = []
	for (var i = 0; i < specs.length; i++) {
		toReturn.push(specs[i].name);
	}
	return toReturn;
}

function plotFishPoints(points) { //identical to the earlier function
	for (var i = 0; i < points.length; i++) {
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng]);
		makeFishPointPopup(points[i], marker); //except we make a popup for each one as opposed to having an onclick event
		fishPoints.push(marker); //and we add it to a different array
		fishClusters.addLayer(marker); //add it to our clusters
	}
}

function makeFishPointPopup(point, marker) { //function to make the popup for a given marker and point
	var string = ""; //new empty string
	string = "<b>Name: </b>" 				+ point.locName				+ "<br>"
		+ 	"<b>Species: </b>" 			  + prettySpecies(point.species); + "<br>"; //adds the name, description and species located there to the popup
	marker.bindPopup(string);//make a new popup for our marker with the string we just made
}

function prettySpecies(species) {                                         // function to print the species all pretty
  var stringToReturn = "<ul>";                                              // initially start a list in html
   for (var i = 0; i < species.length; i++) {                                // parse through the species
    stringToReturn += "<li>" + species[i].name + "</li>";                     // add the species name to the list
    for (var j = 0; j < species[i].lengths.length; j++) {                    // parse through all of the lengths for the species
      stringToReturn += "<ul><li>" + species[i].lengths[j] + "</li></ul>"; // add the lengths to the string
	}
		stringToReturn += "</ul></ul>" //finish off the last tables
		return stringToReturn; //return it
	}
}

function displayFishClusters() {
	__map.addLayer(fishClusters);
	// __map.removeLayer(fishClusters);
}

function insertRow(code, locName, species) {
	var newRow = myTable.insertRow(myTable.rows.length);

	var link = document.createElement('a');
	link.setAttribute('href', 'javascript:zoomLocCode(' + code + ')');

	var newCell = newRow.insertCell(0);
	link.appendChild(document.createTextNode(code));
	newCell.appendChild(link);

	newCell = newRow.insertCell(1);
	var newText = document.createTextNode(locName);
	newCell.appendChild(newText);

	newCell = newRow.insertCell(2);
	var toAdd = "";
	for (var i = 0; i < species.length; i++) {
		toAdd += species[i] + ", "
	}
	newText = document.createTextNode(toAdd);
	newCell.appendChild(newText);

	addData(code, locName, species);
}


function addData(code, locName, species) {
	listData[listData.length] = {
		"code": code,
		"name": locName,
		"specs": species
	}
}

loadMap();        // call load map
getFishPoints();  // get our fish points and plot them
getWaterPoints(); // get our water points and plot them
displayFishClusters();


