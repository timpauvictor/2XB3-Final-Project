function graphInit(latlng) {
	//console.log(latlng);
	console.log("Graph: Attempting to find a matching piece of data for coords:" + latlng);
	var jQueryPromise = $.post("http://localhost:8080/api/waterPointLatLng", {
		"lat": latlng[0],
		"lng": latlng[1]
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		//console.log(val);
		dataPrep(val);
	});
}

function dataPrep(waterPoint) {
	console.log(waterPoint);
}
