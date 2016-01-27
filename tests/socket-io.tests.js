"use strict";

const assert      = require('assert'),
      port        = 802,
      socketURL   = 'http://localhost:'+port,
      url         = 'http://localhost:'+port,
      clientName  = 'Rust Cole',
      http        = require('http'),
      server      = require('../app.js'),
      io          = require('socket.io-client'),
      _           = require("lodash"),
      options     = {
        transports: ['websocket'],
        'force new connection': true
      };

describe("server api", () => {

  before( () => server.listen(port));
  after(  () => server.close());

  it("returns 200 for the root", done => {
    const test = (res) => {
      assert.equal(200, res.statusCode);
      done();
    };

    http.get(url, test);
  });

  describe("realtime api", () => {
      let client;

      beforeEach( () => client = io.connect(socketURL, options));
      afterEach(  () => client.disconnect());

      it("should broadcast new users to all users", done => {
        let count = 0,
            otherClient;

        const otherName = 'Marty Heart',
          test = (data) => {
            count++;
            if(count === 2) {
              assert.equal(data.customer, otherName);
              otherClient.disconnect();
              done();
            } else {
              assert.equal(data.customer, clientName);
            }
          };

        client.on('connect', () => {
          client.emit('add-customer',  clientName );
          client.on('add-customer', test);

          otherClient = io.connect(socketURL, options);
          otherClient.on('connect', () => {
            otherClient.emit('add-customer', otherName );
          });
        });
      });

      it("should show list of branches for repo", (done) => {

        const test = (data) => {
          console.log(data);
          assert.equal(_.keys(data).length, 2);
          done();
        }

        client.on("connect", () => {
          client.emit('get-branches', "repo-name");
          client.on('get-branches', test);
        });

      });
    });
});
