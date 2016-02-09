'use strict'
// app.js

// Libraries
var express         = require('express');
var app             = express();
var server          = require('http').Server(app);
var io              = require('socket.io')(server);
var bodyParser      = require('body-parser');
var r               = require('rethinkdb');
var p               = require('path');
var _               = require('lodash');

// Routes
var DefaultRoute    = require("./app/routes/default_route");
var BitBucketRoute  = require("./app/routes/bitbucket_route");
var JenkinsRoute    = require("./app/routes/jenkins_route");
var RepoRoute       = require("./app/routes/repo_route");
var EventsRoute     = require("./app/events/routes");
var socket_conn     = null; // list of users we have open socket connections to

//For serving the index.html and all the other front-end assets.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var port = process.env.PORT || 802;        // set our port

// Trust the proxy (for DigitalOcean)
app.enable( 'trust proxy' );

//The REST routes for "todos".
app.route('/')
  .get(new DefaultRoute(io).list);

app.route('/repo')
  .get (new RepoRoute(socket_conn, "test", "master").get);

app.route('/webhooks/bitbucket/:id')
  .get (new BitBucketRoute(io).get);

app.route('/webhooks/bitbucket')
  .post(new BitBucketRoute(io).add)
  .get (new BitBucketRoute(io).list);

app.route('/webhooks/jenkins')
  .post(new JenkinsRoute(io).add);
  //.get(console.log("Jenkins GET!"));


//If we reach this middleware the route could not be handled and must be unknown.
///app.use(handle404);

app.use(handle404);

function handle404(err, req, res, next) {
  if (err.status !== 404) return next();
  res.send('404 error\n\n' + JSON.stringify(req));
}


//Generic error handling middleware.
app.use( function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
});


let events_route = new EventsRoute(io);
events_route.listen();

server.listen(port, function() {
  console.log('server up and running  at ' + port);
});

module.exports = server;
