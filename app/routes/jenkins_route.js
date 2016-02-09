"use strict"

var JenkinsModel = require("../rethinkdb/jenkins");
var io = null;

var J = null;

class JenkinsRoute {

	constructor(socket_io) {
		 J = new JenkinsModel();
		 io = socket_io;
	}

	add (req, res) {
		console.log("adding jenkins data");
		let body = req.body;

		console.log("Adding Test Result - "+
								body.name +" - " +
								body.branch + " : " +
								body.build );

		return J.insert(body)
			.then(function (data) {
				console.log("It is added");
					io.emit("jenkins", body);
  				res.send(body);
			})
			.catch( function (err) {
				console.log("insertion failed");
				console.log(err);
				err.send(err);
			});
	}
}

module.exports = JenkinsRoute;
