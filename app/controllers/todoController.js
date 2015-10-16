var mongoose = require( 'mongoose' ),
	Todo = mongoose.model( 'Todo' ),
	User = mongoose.model( 'User' )

function create ( req, res ) {
	console.log(req.body)
	User.findOne( {username: req.body.user }, function( err, user){
		if( err ) {
			res.send( err )
		} else {
			console.log("User is")
			console.log( user )

		var todo = new Todo
			todo.task = req.body.task
			todo.done = false
			todo.userId = user._id
			todo.save(function( err){
				console.log("In here")
				console.log( user )
				if( err ) {
					res.send( err )
				} else {
					user.todos.push(todo)
					res.json({success: true, message: "you successfully added"})
				}
			})
		}
	})
	
}

module.exports = {
	create : create
}