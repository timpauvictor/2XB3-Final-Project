var fishPoint = require('./models/fishguidepoint.js');

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

	//frontend routes===========================================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}
