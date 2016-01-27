'use strict'

let rp = require('request-promise');
let username  = null;
let password  = null;

class BitBucketService {


  constructor(repo, user, pass) {
      this.username = user;
      this.password = pass;
  }

  // return an array of branches for given project
  get_branches(account_name, repo_slug) {
    let url = 'https://api.bitbucket.org/1.0/repositories/' + account_name +"/" + repo_slug +"/branches";

    console.log("URL: " + url);
    //return {"master": {"commits": 5}, "branch1": {"commits": 6}};

   let options = {
        auth: {
          user: this.username,
          pass: this.password},
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
