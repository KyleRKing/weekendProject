var User = require('../models/User')

function index(req, res){
	// get all the users -- index
	User.find(function(err, users){
		if(err) res.send(err)
		res.json(users)
	})
}

function create(req, res){
	// make a single user -- create
	console.log("Creating a user")
	var user = new User()

	user.name = req.body.name
	user.username = req.body.username
	user.password = req.body.password

	user.save(function(err){
		if(err){
			if(err.code == 11000){
				return res.json({success: false, message: "username already exists" })
			} else {
				res.send(err)
			}
		}
		res.json({success: true, message: "User created, Wahey!"})
	})
}

function show(req, res){
	//get a single user -- show
	User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err)
		res.json(user)
	})
}

function update(req, res){
	// update a single user -- update
	User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err)

		if(req.body.name) user.name = req.body.name
		if(req.body.username) user.username = req.body.username
		if(req.body.password) user.password = req.body.password

		user.save(function(err){
			if(err) res.send(err)
			res.json({success: true, message: "you have been updated!"})
		})
	})
}

function destroy(req, res){
	// delete a single user -- destroy
	User.remove({
		_id: req.params.user_id
	}, function(err, user){
		if(err) res.send(err)
		res.json({success: true, message: "YOU HAVE BEEN TERMINATED!"})
	})
}



module.exports = {
	index: index,
	create: create,
	show: show,
	update: update,
	destroy: destroy

}




