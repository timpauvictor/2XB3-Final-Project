__startingCoords = [0, 0]
__zoomLevel = 4;

function loadMap() {
    __map = L.map("map").setView(__startingCoords, __zoomLevel);
    console.log('map created');
    L.esri.basemapLayer("Topographic").addTo(__map);
    console.log('topographic layer added');
}

function getPoints() {
	
}

loadMap();
