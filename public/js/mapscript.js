var __startingCoords = [0, 0]
var __zoomLevel = 4;
var allPoints;

function loadMap() {
    __map = L.map("map").setView(__startingCoords, __zoomLevel);
    console.log('map created');
    L.esri.basemapLayer("Topographic").addTo(__map);
    console.log('topographic layer added');
    __map.invalidateSize();
}

function getPoints() {
	console.log("Attempting to get all points");
	var jQueryPromise = $.get('http://localhost:8080/api/points', {
		dataType: "jsonp"
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		allPoints = val;
	})
}

loadMap();
__map.invalidateSize();
getPoints();
