var fishPoint = require('./models/fishguidepoint.js');
var waterPoint = require('./models/waterpoint.js');

module.exports = function(app) {

	//server routes to handle api calls
	//authentication routes=====================================
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
