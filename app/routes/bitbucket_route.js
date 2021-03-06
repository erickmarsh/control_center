"use strict"

var BitBucketModel = require("../rethinkdb/bitbucket");
var io  = null
var BB = null;

class BitbucketRoute {

	constructor(socket_io) {
		BB = new BitBucketModel();
		io = socket_io;
	}

	add (req, res) {
		console.log("Bitbucket - Adding item");

		let body 	= req.body;

		return BB.insert(body)
			.then(function (data) {
					console.log("inserted");
					res.send("HELLLOOOOO"+ body);
			})
			.catch( function (err) {
				console.log("insertion failed");
				console.log(err);
				err.send(err);
			});
	}

	/*
	*	Get a list of items
	*/
	list (req, res) {
		return BB.get(null)
      		.then(function (data) {
				console.log("Got the data! " + data);
				res.send(data);
			}).catch (function (err) {
				console.log("Router - there was a problem!!");
				console.log(err);
				res.send(err);
			});
	}

	/*
	*	Get a single item
	*/
	get (req, res) {
		console.log ("getting item");
    	if (req.params.id === undefined || req.params.id === null) {
			res.send("Missing ID Get Parameter")
		}

    	var id = req.params.id;

		return BB.get_by_id(id)
			.then(function (data) {
				res.send(data);
			}).catch (function (err) {
				res.send(err);
			});
	}

}

/*
*	Private Functions
*
*/

function itemAdded(res)
{
  console.log("It is added");
  res.send(res);
  return true;
}

function itemFailed(err)
{
    console.log("insertion failed");
    console.log(err);
    err.send(err);
	return true;
}

module.exports = BitbucketRoute;
