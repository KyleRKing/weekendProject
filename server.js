var Todo = require( './app/models/Todo.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var port = process.env.PORT || 8080
var mongoose = require('mongoose')
var cors = require('cors')
var apiRouter = require('./app/routes/userRoutes')
var todoRouter = require('./app/routes/todoRoutes.js')


mongoose.connect('mongodb://localhost:27017/node-crm-app')

// set up middleware
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(morgan('dev'))


app.use('/api', apiRouter) // whenever we get a request starting with /api
app.use('/api/todo', todoRouter)

app.listen(port)
console.log("listening on port " + port)




