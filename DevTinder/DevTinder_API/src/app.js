const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

// signup
app.post("/signup", async (req, res) => {
	// create a new user (instance) of the User model
	const user = new User({
		firstName: "Akash",
		lastName: "Kumar",
		emailId: "ak@gmail.com",
		password: "Akash@123",
	});
	try {
		// save the user to the database
		await user.save();
		// return a success response
		res.send("User created successfully");
	} catch (err) {
		// return an error response if the save operation fails
		res.status(500).send(
			"Server error while creating user : " + err.message
		);
	}
});

connectDB()
	.then(() => {
		console.log("Database connection established...");
		app.listen(7777, () => {
			console.log("Server is successfully listening on 7777 port...");
		});
	})
	.catch((err) => {
		console.error(err);
	});
