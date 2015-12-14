// app/models/bitbucket.js

// TODO: move all things specific to RethinkDB to the rethinkdb.js file
var r = require('rethinkdb')
  , util = require('util')
  , assert = require('assert')
  , logdebug = require('debug')('rdb:debug')
  , logerror = require('debug')('rdb:error');

var dbConfig = {
    host:  '192.168.191.129',
    port:  28015,
    db  : 'control_center'
  };

var connection = null;

var rTable = r.db(dbConfig.db).table('bitbucket');

module.exports.get = function (data, fulfill, reject) {
    console.log("getting the data");

    var conn = {};
    return new Promise(function (resolve, reject) {  
      createConnection(conn)
        .then( function(conn) {
          rTable.orderBy(r.desc('timestamp')).run(conn)
              .then( function(cursor) {
                // Retrieve all the todos in an array
                console.log("HERE is the list");
                cursor.forEach(function(element) {
                  console.log(element);
                }, this);
                
                resolve (cursor);
              })
              .error(function(err) {
                  console.log("There was an error fetching data");
                  reject (err);
              });
        });
    });
}



module.exports.add = function (data, fulfill, reject) {
    console.log("Adding some data here" + JSON.stringify(data));

    var conn = {};
    
    return new Promise(function (resolve, reject) { 
        createConnection(conn)
          .then( function(conn) {
              //console.log(conn);
              rTable.insert(data).run(conn)
                  .then( function (result) {
                      if (result.inserted !== 1) { 
                        console.log("Rejecting: "+ JSON.stringify(result))
                        reject (result);
                      }
                      else {
                        console.log("inserting: "+ JSON.stringify(result));
                        resolve (result);
                      }
                  })
                  .error ( function (err) {
                      console.log(err);
                      reject(err);
                  });
          });
    });
};

module.exports.get_by_id = function(id) {
    console.log("Getting by ID = "+ JSON.stringify(id));
    
    var conn = {};
    return new Promise(function (resolve, reject) { 
        createConnection(conn).then( function (conn) {
            rTable.get('88580f7d-8e5d-43ed-a175-026b37833af4').run(conn)
                .then (function (result) {
                    if (result == null) 
                      reject (result);
                    else {
                      console.log("the result " + JSON.stringify(result));
                      resolve(result);
                    } 
                }).catch (function (err) {
                    console.log("Could not find item");
                    reject(err);
                })
        });
    });  
}


function createConnection(connection) {
  return r.connect({host: dbConfig.host, port: dbConfig.port })
      .catch( function(err){
        console.log("there was a problem with the connection");
        throw err;
      });
}
