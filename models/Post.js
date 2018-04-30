
const knex = require('knex');

let bookshelf = require('bookshelf');
bookshelf = bookshelf(connect());


const Post  = bookshelf.Model.extend({
	tableName : 'posts',
	idAttribute: 'id'
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

module.exports= Post;