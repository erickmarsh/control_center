// app.js

// Libraries
var express         = require('express');
var bodyParser      = require('body-parser');
var r               = require('rethinkdb');
var p               = require('path');

// Routes
var default_route   = require("./app/routes/default");
var BitBucketRoute = require("./app/routes/bitbucket_route");
var app = express();

//For serving the index.html and all the other front-end assets.
app.use(express.static('/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var port = process.env.PORT || 802;        // set our port

// Trust the proxy (for DigitalOcean)
app.enable( 'trust proxy' );

//The REST routes for "todos".
app.route('/')
  .get(default_route.defaultMessage)
  .post(default_route.post);
 
app.route('/webhooks/bitbucket/:id')
  .get (new BitBucketRoute().get);

app.route('/webhooks/bitbucket')
  .post(new BitBucketRoute().add)
  .get (new BitBucketRoute().list);
 

//If we reach this middleware the route could not be handled and must be unknown.
///app.use(handle404);

app.use(handle403);

function handle403(err, req, res, next) {
  if (err.status !== 403) return next();
  res.send('403 error\n\n' + JSON.stringify(req));
}


//Generic error handling middleware.
app.use( function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
});

app.listen(port);
console.log('Magic happens on port ' + port);
