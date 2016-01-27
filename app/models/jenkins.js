"use strict";


var logdebug = require('debug')('rdb:debug')
  , logerror = require('debug')('rdb:error');


// Private  Variables
var RethinkDB  = require("./services/rethinkdb");
var db = null;

class JenkinsModel {

  constructor () {
      db = new RethinkDB("bitbucket");
  }

  insert (data) {
      var result = db.insert(data);
      //console.log(result);
      return Promise.resolve(result);
  }
}

module.exports = JenkinsModel;
