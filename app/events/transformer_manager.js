'use strict'

var fs = require("fs");
var transformers = require("./transformers.js");

var event_list = [];

class TransformerManager {
    
    construct() {

    }   
    
    register (event_name, func) {
        event_list.push({name: event_name, func: func})
    }
    
    exec(event_name, data) {
        var event = event_list.filter( (e) => {
            return e == event_name;
        });
        
        if (event.length == 0)
            throw new Error("Event not registered: ${event_name}");
       
        return event[0].func(data);
       
    }
}