'use strict'

var RethinkDB   = require("../rethinkdb/rethinkdb");
var ChangeFeed  = require("../rethinkdb/change_feed_emitter");

var _io, _socket = null;

class RepoRoute {

  constructor(io, socket) {
    //console.log("io:" + io);
    _io     = io;
    _socket = socket;
    this._db     = new RethinkDB("bitbucket");
  }

  get (req, res) {
      
      let repo = req.params.repository;
      let branch = req.params.branch;
      
   
        // if no repo or branch then subscribe to everything
        var CFE = new ChangeFeed(_io, _socket)
        
        CFE.add_repo(repo, branch, 'bitbucket')
        .then( (data) => {
                console.log("success");
            }).catch( (err) => {
                console.log("err1 = "+err);
                res.send(err);
            });
       console.log("done");
       res.send("done")
  }   

  // subscribe to all changes from bitbucket and jenkins
  /*
  get(req, res) {
    var stream = this._db.subscribe("magento-2-ce", "master");

    stream.on('data', (chunk)=> {
      console.log("\n\nchunk: "+ JSON.stringify(chunk));
      if (this._io != undefined) {
        console.log("chunk: "+ chunk);
        this._io.emit("bitbucket", chunk);
      }
    });
    res.send('stream started');
  }
  */
}

module.exports = RepoRoute;