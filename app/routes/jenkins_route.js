"use strict"

var JenkinsModel = require("../models/jenkins");

var J = null;

class JenkinsRoute {

	constructor() {
		 J = new JenkinsModel();
	}

	add (req, res) {
		var body = req.body;

		console.log("Adding Test Result - "+
								body.name +" - "+
								body.branch + " : "+
								body.build );

		return J.insert(body)
			.then(function (data) {
				console.log("It is added");
  				res.send(data);
			})
			.catch( function (err) {
				console.log("insertion failed");
				console.log(err);
				err.send(err);
			});
	}
}

module.exports = JenkinsRoute;
