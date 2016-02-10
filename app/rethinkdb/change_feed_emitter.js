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
    
    add_bitbucket_repo(repo_name, branch, event_name) {
        let t = this;
        
        //emit bitbucket events
        return this._rtdb.r
            .db("control_center")
            .table("bitbucket")
            .filter( (row) => {
                return row("repository").eq(repo_name)
                    .and( row("push")("changes").nth(0)("new")("name").eq(branch) )
            })
            .changes({includeInitial: true})
            .limit(10)
            .then ( (results) => {
                console.log("size" + results.length);
                results.each( function(err, elem) {
                    if (err) throw err;
                    if (t._socket.connected) {
                        console.log("emit event: " + event_name);
                        t._socket.emit(event_name, elem);
                    }
                    else {
                        console.log("socket not connected");
                    }

                });
                
                console.log("RESULTS = "+ results);
                return Promise.resolve(results);  
            });
       
       //emit Jenkins events
    }
    
}

module.exports = ChangeFeedEmitter;