const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
require('dotenv').config();


const chimp_key = process.env.chimpKey
const chimp_id = process.env.chimpListId

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
			const firstName = req.body.fName;
			const secondName = req.body.lName;
			const email = req.body.email;
			const listID = chimp_id;

			const subscribingUser = {
				firstName: firstName,
				lastName: secondName,
				email: email
			}


			// mailChimp Setup
			mailchimp.setConfig({
				apiKey: chimp_key,
					server: "us1"
				})

			// Sending information to mailchimp
		async function run() {
			const response = await mailchimp.lists.addListMember(listID, {
				email_address: subscribingUser.email,
				status: "subscribed",
				merge_fields: {
					FNAME: subscribingUser.firstName,
					LNAME: subscribingUser.lastName
				}
			});
			//If all goes well logging the contact's id
			res.sendFile(__dirname + "/success.html")
				console.log(
					`Successfully added contact as an audience member. The contact's id is ${response.id}.`
					);
				}
			run().catch(e => res.sendFile(__dirname + "/failure.html"));
})

// try again button
app.post("/failure", function(req, res){
	res.redirect("/")
})

// back to home page
app.post("/success", function (req, res) {
	res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
	console.log("Server is running at port 3000");
});
