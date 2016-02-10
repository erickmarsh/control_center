'use strict'
var config      = require('config');
let rp          = require('request-promise');

var username  = config.get('bitbucket.username');
var password  = config.get('bitbucket.password');

class BitBucketService {


  constructor() {
  }

  // return an array of branches for given project
  get_branches(account_name, repo_slug) {
    let url = 'https://api.bitbucket.org/1.0/repositories/' + account_name +"/" + repo_slug +"/branches";

    console.log("URL: " + url);
    //return {"master": {"commits": 5}, "branch1": {"commits": 6}};

   let options = {
        auth: {
          user: username,
          pass: password},
        json: true,
        resolveWithFullResponse: true,
        uri: url
   };

   return rp(options)
      .then( (response) => {
        console.log("response: "+ response);
        Promise.resolve (_.keys(response.body));
      })
      .catch( (err) => {
        console.log("err: "+ err);
        Promise.reject(err);
      });
   }
}

module.exports = BitBucketService;
