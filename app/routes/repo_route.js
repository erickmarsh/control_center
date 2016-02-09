'use strict'

var repo    = null,
    branch  = null,
    io      = null,
    RethinkDB  = require("../rethinkdb/rethinkdb"),
    db = null;

class RepoRoute {

  constructor(in_io, in_repo, in_branch) {
    console.log("in_socket:" + in_io);
    io     = in_io;
    repo   = in_repo;
    branch = in_branch;
    db     = new RethinkDB("bitbucket");
  }

  // subscribe to all changes from bitbucket and jenkins
  get(req, res) {
    var stream = db.subscribe("magento-2-ce", "master");

    stream.on('data', (chunk)=> {
      console.log("\n\nchunk: "+ JSON.stringify(chunk));
      if (io != undefined) {
        console.log("chunk: "+ chunk);
        io.emit("bitbucket", chunk);
      }
    });
    res.send('stream started');
  }
}

module.exports = RepoRoute;
