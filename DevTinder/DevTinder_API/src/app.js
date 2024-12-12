const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// signup dynamically
app.post("/signup", async (req, res) => {
	console.log(req.body);
	// create a new user (instance) of the User model
	const user = new User(req.body);
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

// get filter users in the database
app.get("/user", async (req, res) => {
	try {
		// single user found by emailId - findOne({ emailId: email})
		const user = await User.findOne({ emailId: req.body.emailId });
		if (!user) {
			res.status(404).send("User not found.");
		} else {
			res.send(user);
		}

		// array of users found by emailId - find({ emailId: email})
		// const users = await User.find({ emailId: req.body.emailId });
		// if (users.length > 0) {
		// 	res.send(users);
		// } else {
		// 	res.status(404).send("No users found.");
		// }
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});

// get user in the database by id - user object
app.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("No users found.");
		} else {
			res.send(user);
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});

// get all users in the database - array of users
app.get("/feed", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
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
