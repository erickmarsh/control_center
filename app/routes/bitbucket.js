// /app/routes/bitbucket.js

var BB = require("../../app/models/bitbucket");

module.exports.add = function (req, res, next) {
    console.log("Adding item: "+ JSON.stringify(req.body));
    
    return BB.add(req.body)
        .then(itemAdded(res))
        .catch(itemFailed(res, next));
}

module.exports.list = function (req, res, next) {
    console.log("bitbucket list");
   // var data = req;

    return BB.get(null)
      .then(function (data) {
          console.log("Got the data! " + data);
          res.send(data);
      }).then (function (data) {
          console.log("next line");
          //res.send(data);
      }, function (error) {
          console.log("there was a problem!!")
      });
}

module.exports.get = function (req, res, next) {
    console.log ("getting item");
    
    return BB.get_by_id(req.params.id)
        .then(function (data) {
            res.send(data);
        }).catch (function (err) {
            res.send(err); 
        });
}


function itemAdded(res, next)
{
  console.log("It is added");
}

function itemFailed(res, next)
{
    console.log("insertion failed");
}


function handleError(res) {
    return function(error) {
        res.send(500, {error: error.message});
    }
}
