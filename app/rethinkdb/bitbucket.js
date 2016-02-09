"use strict";


var logdebug = require('debug')('rdb:debug')
  , logerror = require('debug')('rdb:error');


// Private  Variables
var RethinkDB  = require("./rethinkdb");

class BitBucketModel {

    constructor () {
        this._db = new RethinkDB("bitbucket");
    }

    get (data) {
        var result = this._db.list();
        console.log(result);
        return Promise.resolve(result);
    }

    insert (data) {
        console.log("inserting ${data}");
        var result = this._db.insert(data);
        console.log(result);
        return Promise.resolve(result);
    }

    get_by_id (id) {
        console.log ("looking up id = "+ id);
        var result = this._db.get_by_id(id);
        console.log(result);
        return Promise.resolve(result);
    }
}

module.exports = BitBucketModel;
