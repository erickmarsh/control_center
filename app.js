// app.js

// Libraries
var express         = require('express');
var bodyParser      = require('body-parser');
var r               = require('rethinkdb');
var p               = require('path');

// Routes
var default_route   = require("./app/routes/default");
var bitbucket_route = require("./app/routes/bitbucket");
var app = express();

//For serving the index.html and all the other front-end assets.
app.use(express.static('/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var port = process.env.PORT || 801;        // set our port



//The REST routes for "todos".
app.route('/')
  .get(default_route.defaultMessage);
 
app.route('/webhooks/bitbucket/:id')
  .get ( function (req, res, next) {
      if (req.params.id == null || req.params.id == undefined) {
        next();
      }
      else {
        bitbucket_route.get(req, res, next);
      }
  });

app.route('/webhooks/bitbucket')
  .post(bitbucket_route.add)
  .get (bitbucket_route.list);
 

//If we reach this middleware the route could not be handled and must be unknown.
///app.use(handle404);

//Generic error handling middleware.
///app.use(handleError);
app.listen(port);
console.log('Magic happens on port ' + port);
