var __startingCoords = [0, 0]
var __zoomLevel = 4;
var __map;
var allMarkers = [];

function loadMap() {
    __map = L.map("map").setView(__startingCoords, __zoomLevel);
    console.log('map created');
    L.esri.basemapLayer("Topographic").addTo(__map);
    console.log('topographic layer added');
    __map.invalidateSize();
}

function getFishPoints() {
	console.log("Attempting to get all points");
	var jQueryPromise = $.get('http://localhost:8080/api/fishPoints', {
		dataType: "jsonp"
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		plotPoints(val);
	})
}

function plotPoints(points) {
	console.log(points);
	for (var i = 0; i < points.length; i++) {
		console.log(points[i].geometry.lat, points[i].geometry.lng);
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng]).addTo(__map);
		popupString = makeString(points[i], marker);


	}
}

function makeString(point, marker) {
	console.log(point);
	var string = "";
	string = "\
		<b>Name: </b> " 			+ point.locName + "<br>"
		+ "<b>Description: </b>" 	+ point.locDESC + "<br>"
		+ "<b>Species: </b>" 		+ prettySpecies(point.species);
	marker.bindPopup(string);
}

function prettySpecies(species) {
	var stringToReturn = " ";
	for (var i = 0; i < species.length; i++) {
		
	}
}

loadMap();
__map.invalidateSize();
getFishPoints();
__map.invalidateSize();
