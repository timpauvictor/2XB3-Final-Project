var labels;
var code;
var rawData;
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
		dataPrep(val.dailyLevels, val.stationCode);
	});
}

function makeLabels() {
	var labels = ["00:00", "06:00", "12:00", "18:00", "24:00"];
	return labels
}


function dataPrep(data, stationCode) {
	//console.log(data, stationCode);
	labels = makeLabels();
	code = stationCode;
	//console.log("data", data);
	rawData = [];

	for (var i = 0; i < data.length; i++) {
		rawData.push([i, data[i]]);
	}
	
	//console.log("rawData", rawData);

	google.charts.setOnLoadCallback(makeGraph);
}

function makeGraph() {
	console.log("called");
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Time');
	data.addColumn('number', code);

	data.addRows(rawData);
	var options = {
		chart: {
			title: "Water Levels for " + code
		},
		width: 900,
		height: 500
	};
	console.log(data)

	var chart = new google.charts.Line(document.getElementById('inner-light'));
	chart.draw(data, google.charts.Line.convertOptions(options));

}

