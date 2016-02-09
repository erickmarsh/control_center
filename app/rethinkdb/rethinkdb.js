"use strict";

// Private variables
/*
var r = require('rethinkdbdash')({
  servers:  [{host: '192.168.191.129', port:  28015}],
  db  : 'control_center'
});
*/

class RethinkDB {

	constructor(db_table) {
		this._db_table = db_table;
        this.r = require('rethinkdbdash')({
            servers:  [{host: '192.168.191.129', port:  28015}],
            db  : 'control_center'
        });
	}

	/*
	*	Returns a Promise with the most recent items
	*/
	list(index, value, q_limit) {

		var query = this._r.table(this._db_table);

		if (typeof index !== 'undefined' && index !== null) {
			query = query.getAll(value, {index: index});
		}

		if (typeof q_limit !== 'undefined' && q_limit !== null) {
			query = query.limit(q_limit);
		}

		return query.orderBy('timestamp').run();
	}

	/*
	*	Insert some data
	*/
	insert(data) {
		if ( (typeof data === 'undefined') || data === null ) {
			return Promise.reject("Cannot insert blank data");
		}

		return this.r.table(this._db_table).insert(data).run();
	}

	/*
	*	Get by ID
	*/
	get_by_id(uuid) {
		if ( (typeof uuid === 'undefined') || uuid === null ) {
			return Promise.reject("Cannot select null ID");
		}

		return this.r.table(this._db_table).get(uuid).run();
	}

	filter(obj) {
		return this.r.table(this._db_table).filter(obj).run();
	}

}

module.exports = RethinkDB;
