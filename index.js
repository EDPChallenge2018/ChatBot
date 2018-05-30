'use strict'

// Imports dependencies and set up http server
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

//Allow us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes

app.get('/', function(req, res) {
	res.send("OPAH")
})

let token = "EAAbIskuk8dIBAJYXg4nlKFpnY28a9vxcTbuzPxFn2jk7QCCTTAa7UV29o9MybSl1rQWSs4jzpZAZAPZCdZCYYT1cTZC4DYySZCZAi8OzSRj4aN8EaDh6ZBk30YFbBCrg9bqfWaic1RH431UJCBGhNOtUgZBxGZBnm3yX8ablp7FvyChiDGvmTpVhwNkMMIzlJQ7hMZD"
// facebook
app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "edpchallenge") {
		res.send(req.query['hub.challenge'])
	}
	res.send("wrong token")
})
app.post('/webhook/', function(req, res){
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0,100))
		}
	}
	res.sendStatus(200)
})
function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v3.0/me/messages",
		qs : {access_token: token},
		method : "POST",
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function(error, response, body) {
		if(error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

app.listen(app.get('port'), function() {
	console.log("running: port")
})

<script>
window.fbAsyncInit = function() {
    FB.init({
      appId            : '1909517959098834',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.0'
    });
  };

(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = 'https://connect.facebook.net/pt_PT/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	<!-- Your customer chat code -->
	jQuery('body').append('<div class="fb-customerchat" page_id="226748641432465" theme_color="#fa3c4c" logged_in_greeting="Olá! Como posso ajudar-lhe?" logged_out_greeting="Olá! Como posso ajudar-lhe?"> </div>');
</script>