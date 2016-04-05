var labels;
var code;
var rawData;
var locationDesc;
var loadCalled = false;

function graphInit(latlng) {
	//console.log(latlng);
	if (!loadCalled) {
		google.charts.load('current', {'packages':['line']});
		loadCalled = true;
	}

	console.log("Graph: Attempting to find a matching piece of data for coords:" + latlng);
	var jQueryPromise = $.post("http://localhost:8080/api/waterPointLatLng", {
		"lat": latlng[0],
		"lng": latlng[1]
	});
	var realPromise = Promise.resolve(jQueryPromise);
	realPromise.then(function(val) {
		console.log("Match found");
		// console.log(val);
		dataPrep(val.dailyLevels, val.stationCode, val.stationLoc);
	});
}

function makeLabels() {
	labels = [];
	hours = 0;
	minutes = 0;
	for (var i = 0; i < 288; i++) { //288 five minute intervals in a day
		labels.push(String(hours) + ":" + String(minutes));
		if (minutes === 55) {
			hours += 1;
			minutes = 0;
		} else {
			minutes += 5;
		}
	}
	// console.log(labels);
	return labels
}


function dataPrep(data, stationCode, stationLocation) {
	//console.log(data, stationCode);
	locationDesc = String(stationLocation);
	labels = makeLabels();
	code = stationCode;
	//console.log("data", data);
	rawData = [];

	for (var i = 0; i < 288; i++) { //we only use the first 288 because we're looking at 5 minute intervals 
		rawData.push([labels[i], data[i]]);
		// console.log(rawData[i])
	}
	
	//console.log("rawData", rawData);

	google.charts.setOnLoadCallback(makeGraph);
}

function makeGraph() {
	console.log("called");
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Time');
	data.addColumn('number', 'Water level in metres');

	data.addRows(rawData);
	var options = {
		chart: {
			title: "Water Levels for " + locationDesc
		},
		width: 700,
		height: 400,
		vAxis: {
			format: 'decimal'
		}
	};
	// console.log(data)

	var chart = new google.charts.Line(document.getElementById('inner-light'));
	chart.draw(data, google.charts.Line.convertOptions(options));

}

