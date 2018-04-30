const express = require('express');
const knex = require('knex');

const app = express();


const Post  = require('./models/Post');

const port = process.env.PORT || 8000; //use heroku's port if available (if launched) or use 8000

app.listen(port, function(){
	console.log(`listening on port ${port}`);
}); 

app.get('/api/posts', function(request, response){
	let connection = connect();
	let promise = connection.select().from('posts');
	promise.then(function(posts){
		console.log(posts);
		let newMap = posts.map(obj=>{
				var newObj={};
				newObj["id"] = obj.id;
				newObj["name"] = obj.comment;
				newObj['professorId'] = obj.professor;
				return newObj;
			})
		response.json(newMap);
	}, function(){
		response.json({
			error: 'Something went wrong when finding artists'
		});
	})
});


app.get('/api/professors', function(request, response){
	let connection = connect();
	let promise = connection.select().from('professors');
	promise.then(function(professors){
		console.log(professors);
		let newMap = professors.map(obj=>{
				var newObj={};
				newObj["id"] = obj.ProfessorId;
				newObj["name"] = obj.name;
				newObj['school'] = obj.university;
				return newObj;
			})
		response.json(newMap);
	}, function(){
		response.json({
			error: 'Something went wrong when finding artists'
		});
	})
});

app.delete('/delete/post/:postId', function(request, response){
	let postId = request.params.postId;
	let post = new Post({id: postId});
	console.log(post);
	// console.log('HELLO');
	post.destroy().then(function(){
		response.status(204).json({
			body: 'asfasd'
		});
	})
	
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