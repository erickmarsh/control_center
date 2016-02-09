'use strict'

// setup event listeners for BitBucket related messages

var transformers = require("./transformers.js");

class EventListener {
    
    construct (io, socket) {
        this._io = io;
        this._socket = socket;       
    }
    
    add (event_name, emit_event, data, pre_function, post_function) {
       
       let transformed_data = null;
       
       if (pre_function != null) 
            pre_function(event_name, data);
    
       transformed_data = this._transform(event_name, data);
       
       if (emit_event != null) {
            // emit a new event
             this._socket.emit(emit_event, transformed_data);
       }
              
       if (post_function != null)
            post_function(event_name, data, transformed_data);
    }
    

    _transform(event_name, data) {
       // call the transform function if it exists
       if (event_name in transformers && typeof transformers[event_name] === 'function') {
               return transformers[event_name](data);
       }
       
       return data
    }
}

module.exports = EventListener;