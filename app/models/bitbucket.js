"use strict";


var logdebug = require('debug')('rdb:debug')
  , logerror = require('debug')('rdb:error');


// Private  Variables 
var RethinkDB  = require("./services/rethinkdb");
var db = null;

class BitBucketModel {
	
    constructor () {
        db = new RethinkDB("bitbucket");
    }
  
    get (data) {
        var result = db.list();
        console.log(result);
        return Promise.resolve(result);
    }  
    
    insert (data) {
        var result = db.insert(data);
        console.log(result);
        return Promise.resolve(result);
    }
    
    get_by_id (id) {
        console.log ("looking up id = "+ id);
        var result = db.get_by_id(id);
        console.log(result);
        return Promise.resolve(result);
    }
}

module.exports = BitBucketModel;