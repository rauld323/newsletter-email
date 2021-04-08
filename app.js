const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")


const app = express();
// 1.allows css and other static files to run on server
app.use(express.static("public"))

// 2 POST forces app to use bodyParser and intercept raw forms
app.use(bodyParser.urlencoded({ extended: true }))

//1
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html')
})
//2 POST
app.post('/', function (req, res) {
	let firstName = req.body.fName;
	let lastName = req.body.lName;
	let email = req.body.email;

	console.log(firstName,lastName, email)
})

app.listen(3000, function(){
	console.log("Server is running on port 3000")
})

