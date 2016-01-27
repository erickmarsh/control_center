"use strict"

var io        = null;

class DefaultRoute {

  constructor(socket_io) {
    io = socket_io;
  }

  list (req, res) {
    io.emit("bitbucket", {
      actor: "eric",
      branch: "test-pushmaster",
      action: "test-push"
    });
    res.send();
  }
}


module.exports = DefaultRoute;
