var fishPoint = require('./models/fishguidepoint.js');
var waterPoint = require('./models/waterpoint.js');
var diGraph = require('./Digraph.js');
var sp = require('./DjikstraSP.js');
var sort = require('./sort.js');

module.exports = function(app) {

	// app.get('/api/getShortestPath', function(req, res) {
	// 	console.log()
	// }),

	app.get('/api/sortListData', function(req, res) {

		console.log("Received request to sort all points");
		startTime = Date.now();
		var resData = [{}]
		fishPoint.find(function(err, resPoint) {
			if (err) {
				res.send(err);
			}

			for (var i = 0; i < resPoint.length; i++) {
				resData[i] = {
					"code": parseInt(resPoint[i].waterBodyCode),
					"name": resPoint[i].locName,
				}
				var specs = [];
				for (var j = 0; j < resPoint[i].species.length; j++) {
					specs.push(resPoint[i].species[j].name);
				}
				resData[i]["specs"] = specs;
			}
			checkpoint = Date.now();
			console.log("Finished making data from database in", Date.now() - startTime, "ms");


			//-------------------Quicksort
			sortedData = sort.quickSort(resData)
			console.log("Finished sorting in", Date.now() - checkpoint, "ms");
			console.log("Checking for correctness...");
			for (var i = 0; i < sortedData.length - 1; i++) {
				if (sortedData[i+1] > sortedData[i]) {
					console.log("Failed check");
				}
			}
			console.log("Passed check and sending to user")
			res.send(sortedData);

		});
	}),

	//server routes to handle api calls
	app.get('/api/fishPoints', function(req, res) {
		console.log('Received request for all fishPoints');
		fishPoint.find(function(err, resPoint) {
			if (err) {
				res.send(err);
			}
			res.json(resPoint);
		});
		console.log('Request fulfilled');
	});

	app.post('/api/fishPoints', function(req, res) {
		console.log('Received request to add a fishPoint');
		console.log(req.body);
		var newfishPoint = fishPoint(req.body);
		newfishPoint.save(function(err) {
			if (err) throw (err);
			console.log("New fishPoint made");
			res.send("Success");
		})
		console.log('Request fulfilled');
	});

	app.post('/api/waterPointLatLng', function(req, res) {
		console.log("Looking for waterPoint with geometry: lat: " + req.body.lat + ",lng: " + req.body.lng);
		waterPoint.find(function(err, resPoint) {
			if (err) {
				res.send(err);
			}
			for (var i = 0; i < resPoint.length; i++) {
				if ((Number(req.body.lat) === resPoint[i].geometry.lat) && (Number(req.body.lng) === resPoint[i].geometry.lng)) {
					console.log("Match found");
					res.send(resPoint[i]);
					break;				
				}
			}	
		});
	});

	app.post('/api/fishPointCode', function(req, res) {
		console.log("Looking for fishPoint with code: " + req.body.code);
		fishPoint.find(function(err, resPoint) {
			if (err) {
				res.send(err);
			}
			for (var i = 0; i < resPoint.length; i++) {
				// console.log(resPoint);
				if (req.body.code === resPoint[i].waterBodyCode) {
					console.log("Match found");
					res.send(resPoint[i].geometry);
					break;			
				}
			}	
		});
	});

	app.post('/api/waterPoints', function(req, res) {
		console.log("Recieved request to add a waterPoint")
		var newWaterPoint = waterPoint(req.body);
		newWaterPoint.save(function(err) {
			if (err) throw (err);
			console.log('New waterPoint made');
			res.send('Success');
		})
		console.log('Request fulfilled');
	});

	app.get('/api/waterPoints', function (req, res) {
		console.log("Received request for all waterPoints");
		waterPoint.find(function(err, resPoint) {
			if (err) {
				res.send(err)
			}
			res.json(resPoint);
		});
		console.log('Request fulfilled');
	})

	//frontend routes===========================================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}
