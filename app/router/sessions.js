var Session = require('../models/sessionmodel');

module.exports = function(server) {
	server.post('/api/sessions/destroy', function(req,res) {
		Session.destroySession(req.body.tokenData, function(response) {
			if(response === 200) {
				res.send(response);
			} else {
				throw response;
			}
		});
	});
}