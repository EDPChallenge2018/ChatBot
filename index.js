'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser')
  request = requeire('request')

  app = express()

app.set('port', (process.env.PORT || 5000))

//Allow us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes

app.get('/', function(req, res) {
	res.send("Hi iam a chatbot")
})

// facebook
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] == "edpchallenge") {
		res.send(req.query['hub.challenge'])
	}
	res.send("wrong token")
})

app.listen(app.get('port'), function() {
	console.log("running:port")
})