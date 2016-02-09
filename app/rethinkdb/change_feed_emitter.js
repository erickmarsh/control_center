'use strict'

// Private  Variables
var RethinkDB  = require("../rethinkdb/rethinkdb");


class ChangeFeedEmitter {
    
    constructor (io, socket) {
        this._io = io;
        this._socket = socket;   
        this._rtdb = new RethinkDB(null);
    }
    
    add_table(table_name, event_name) {
        var t = this;
        this._rtdb.r.table(table_name).changes().then( (results) => {            
            results.each(function(err,row) {
                if (err) console.error(err);
                console.log("emit event: ${event_name}");
                t._io.emit(event_name, row);
            });
            
            return Promise.resolve(results);       
        });
    }
    
}

module.exports = ChangeFeedEmitter;