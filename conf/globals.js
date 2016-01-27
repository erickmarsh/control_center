'use strict'

var configs = {
	bitbucket_user: "eric_marsh",
	bitbucket_pass: "pqowie1",
	jenkins_url: "http://127.0.0.1"
};


class Config {

	construct() {
	}

	get(property) {
		console.log ("Config: "+ JSON.stringify(configs) );

		if (!(property in configs))
			throw new RangeError ("Config." + property + " does not exist");
		else {
			return configs[property];
		}
	}
}

module.exports = Config;
