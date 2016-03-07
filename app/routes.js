var Point = require('./models/point');

module.exports = function(app) {

	//server routes to handle api calls
	//authentication routes=====================================
	app.get('/api/nerds', function(req, res) {
		Point.find(function(err, points) {
			if (err) {
				res.send(err);
			}
			res.json(points);
		});
	});

	//frontend routes===========================================
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
}