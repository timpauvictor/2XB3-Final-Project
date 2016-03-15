var __startingCoords = [0, 0]
var __zoomLevel = 4;
var __map;
var fishPoints = [];

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

function returnFishPoints() {
	return fishPoints;
}

function plotPoints(points) {
	console.log(points);
	for (var i = 0; i < points.length; i++) {
		console.log(points[i].geometry.lat, points[i].geometry.lng);
		var marker = L.marker([points[i].geometry.lat, points[i].geometry.lng]).addTo(__map);
		makeString(points[i], marker);
		fishPoints.push(marker);
	}
}

function makeString(point, marker) {
	console.log(point);
	var string = "";
	string = "\
			<b>Name: </b>" 				+ point.locName 				+ "<br>"
		+ 	"<b>Description: </b>" 		+ point.locDESC 				+ "<br>"
		+ 	"<b>Species: </b>" 			+ prettySpecies(point.species); + "<br>"
	marker.bindPopup(string);
}

function prettySpecies(species) {
	// console.log(species);
	var stringToReturn = "<ul>";
	for (var i = 0; i < species.length; i++) {
		stringToReturn += "<li>" + species[i].name + "</li>";
		for (var j = 0; j < species[i].lengths.length; j++) {
			stringToReturn += "<ul><li>" + species[i].lengths[j].label + "</li></ul>"
		}
	}
		stringToReturn += "</ul></ul>"
		return stringToReturn;
}

loadMap();
__map.invalidateSize();
getFishPoints();
__map.invalidateSize();
