
const knex = require('knex');

let bookshelf = require('bookshelf');
bookshelf = bookshelf(connect());


const Track  = bookshelf.Model.extend({
	tableName : 'tracks',
	idAttribute: 'TrackId'
});


function connect(){
	let connection =  knex({
		client: 'sqlite3',
		connection:{
			filename: './database.sqlite'
		}
	});//local to this function

	return connection;
}

module.exports= Track;