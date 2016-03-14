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

function getPoints() {
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
		popupString = makeString(points[i]);
	}
}

function makeString(point) {
	
}

loadMap();
__map.invalidateSize();
getPoints();
__map.invalidateSize();
