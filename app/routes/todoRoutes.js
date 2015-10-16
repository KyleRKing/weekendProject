var express = require('express')
var apiRouter = express.Router() //get an instance of express router
var todoController = require('../controllers/todoController')
var jwt = require('jsonwebtoken')
var mySpecialSecret = "pizza"
var User = require('../models/User')

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

apiRouter.route('/new').post(todoController.create)

module.exports = apiRouter	


