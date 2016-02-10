'use strict'

var BBService           = require("../services/bitbucket.js");
var ChangeFeedEmitter   = require("../rethinkdb/change_feed_emitter.js");
var Listeners           = require('./event_listener.js');

class EventsRoute {
    
    constructor (io) {
        this._io = io;
        this._socket = null;
        this._change_feeds = null;
        this._listeners = null;
    }
    
    listen() {
        var t = this;
        t._io.on('connection', function(socket) {
            t._socket        = socket;
            t._listeners     = new Listeners(t._io, t._socket);
            t._change_feeds  = new ChangeFeedEmitter(t._io, socket);
            
            //t._change_feeds.add_repo('magento-ce', 'master', 'bitbucket');
            //t._change_feeds.add_repo('jenkins',   'jenkins');

            t._socket.on('get-branches', (data) => {t._get_branches(data)});
            t._socket.on('add-customer', (data) => {t._add_customer(data)});
            t._socket.on('repo-follow',  (data) => {
                console.log("repo-follow");
                t._change_feeds.add_bitbucket_repo("Repository", "name-of-branch", 'bitbucket');
            });
            
            return socket;
        });
    }
       
    _add_customer(data){
        this._io.emit('add-customer', {
            message: 'new customer',
            customer: data
        });
    }
    
    _get_branches(data){
        let bb_service = new BBService('eric_marsh', 'pqowie123');
        let branches = bb_service.get_branches('eric_marsh', "magento-2-ce");

        // reply back to just the socket that made the req
        this._socket.emit('get-branches', branches);
    }
}

module.exports = EventsRoute;