var Point = require('./models/point');

module.exports = function(app) {

	//server routes to handle api calls
	//authentication routes=====================================
	app.get('/api/points', function(req, res) {
		Point.find(function(err, resPoints) {
			if (err) {
				res.send(err);
			}
			res.json(resPoints);
		});
	});

	app.post('/api/addPoint', function(req, res) {
		console.log(req.body);
		var newPoint = Point(req.body);
		newPoint.save(function(err) {
			if (err) throw (err);
			console.log("New Point Made");
			res.send("Success");
		})
	});

	//frontend routes===========================================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}