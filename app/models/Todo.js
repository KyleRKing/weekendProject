var mongoose = require( 'mongoose' )

var TodoSchema = new mongoose.Schema({
	task: String,
	done: Boolean,
	userId: String
})

var Todo = mongoose.model( 'Todo', TodoSchema)

module.exports = Todo
