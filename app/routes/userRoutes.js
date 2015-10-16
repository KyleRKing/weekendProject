var express = require('express')
var apiRouter = express.Router() //get an instance of express router
var usersController = require('../controllers/usersController')
var jwt = require('jsonwebtoken')
var mySpecialSecret = "pizza"
var User = require('../models/User')

apiRouter.route('/authenticate')
	.post(function(req, res){
	console.log('trying to generate a JWT')
	// 1 - find the user in our db
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user){
		if(err) throw err
		if(!user){
			res.json({success: false, message: "auth failed, idiot"})
		} else if(user){
			// check passwords
			var validPassword = user.comparePassword(req.body.password)
			if(!validPassword){
				res.json({success: false, message: "Auth failed, re-evaluate your life"})
			} else {
				// password is good!
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, mySpecialSecret, {
					expiresInMinutes: 1440
				})
				// now let's actually give it to them!
				res.json({ success: true, message: "enjoy your token!", token: token})
			}
		}
	})
})

apiRouter.route('/users')
	.post(usersController.create)

// the order of routes relative to auth middleware is important!

apiRouter.use(function(req, res, next){
	// let's check everywhere for the JWT!
	var token = req.body.token || req.param('token') || req.headers['x-access-token']

	// if we find the token, let's use mySpecialSecret to try and decode it.
	if(token){
		jwt.verify(token, mySpecialSecret, function(err, decoded){
			if(err){
				res.status(403).send({success: false, message: "forbidden, token can't be decoded"})
			} else {
				req.decoded = decoded
				next()
			}
		})
	} else {
		res.status(403).send({success: false, message: "no token. You're not even trying"})
	}

	// this is going to run EVERY time our API is hit
	// we want to check if the user is logged in here
	console.log("checking is user is logged in")
})

apiRouter.route('/users')
	.get(usersController.index)

apiRouter.route('/me')
	.get(function(req, res){
		res.send(req.decoded)
	})

apiRouter.route('/users/:user_id')
	.get(usersController.show)

	.put(usersController.update)

	.delete(usersController.destroy)


module.exports = apiRouter