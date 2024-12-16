const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utlis/validate");

// middleware to parse JSON request bodies
app.use(express.json());

// signup dynamically
app.post("/signup", async (req, res) => {
	const { firstName, lastName, emailId, password } = req.body;
	try {
		// validate input data
		validateSignupData(req);

		// encrypt password
		const hashedPassword = await bcrypt.hash(password, 10);

		// create a new user (instance) of the User model
		const user = new User({
			firstName,
			lastName,
			emailId,
			password: hashedPassword,
		});
		// save the user to the database
		await user.save();
		// return a success response
		res.send("User created successfully");
	} catch (err) {
		// return an error response if the save operation fails
		res.status(500).send("ERROR : " + err.message);
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

// Delete a user
app.delete("/user", async (req, res) => {
	const userId = req.body.userId;
	try {
		// await User.findByIdAndDelete({ _id: userId });
		await User.findByIdAndDelete(userId); // samething as above line
		res.send("User deleted successfully");
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});

// Update a user
app.patch("/user/:userId", async (req, res) => {
	// const userId = req.body.userId;
	const userId = req.params?.userId;
	const data = req.body;

	try {
		const ALLOWED_FIELDS = ["age", "gender", "about", "skills", "photoUrl"];
		const isAllowField = Object.keys(data).every((key) =>
			ALLOWED_FIELDS.includes(key)
		);
		if (!isAllowField) {
			throw new Error("Invalid field value for user");
		}
		if (!data?.skills?.length > 10) {
			throw new Error("Skills cannot be more than 10");
		}
		// const user = await User.findByIdAndUpdate(userId, data);
		// 3rd parameter is optional
		const user = await User.findByIdAndUpdate(userId, data, {
			returnDocument: "after", // use before , after
			runValidators: true, // run validator function
		});
		console.log(user);
		res.send("User updated successfully");
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
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
