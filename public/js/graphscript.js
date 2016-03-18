function graphInit(latlng) {
	//console.log(latlng);
	console.log("Graph: Attempting to find a matching piece of data for coords:" + latlng);
	var jQueryPromise = $.post("http://localhost:8080/api/waterPointLatLng", {
		"lat": latlng[0],
		"lng": latlng[1]
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		console.log("Match found");
		dataPrep([val.dailyLevels, val.stationCode]);
	});
}

function makeLabels() {
	labels = [];
	hours = 0;
	minutes = 0;
	for (var i = 0; i < 288; i++) { //there are 288 5 minute intervals in 24 hours
		labels.push(String(hours) + ":" + String(minutes));
		if (minutes === 55) {
			hours += 1;
			minutes = 0;
		} else {
			minutes += 5;
		}
	}
	return labels;
}

function dataPrep(data, stationCode) {
	console.log(data, stationCode);
	labels = makeLabels();
	makeGraph(data, labels, stationCode);	
}

function makeGraph(data, labels, code) {
	
}
