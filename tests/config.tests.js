'use strict'

const assert      = require('chai').assert;
const Config_Lib  = require("../conf/globals.js");
var config;

describe ("Configuration Class", () => {

  before( () => config = new Config_Lib());
  after( () => config = undefined);

// redo this test because it is tied to implementation
  it("returns a value for known property", (done) => {

    const test = (result) => {
      assert.equal(result, "eric_marsh");
      done();
    }

    test(config.get('bitbucket_user'));
  });

  it("throws an error if accessing unknown property", (done) => {
    // why do we have to use bind and call this method in a crazy way?
    // http://stackoverflow.com/questions/21587122/mocha-chai-expect-to-throw-not-catching-thrown-errors
    assert.throws( config.get.bind(config, "bad_value"), RangeError );
    done();
  });
});
