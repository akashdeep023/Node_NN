const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { validateSignupData, validateLoginData } = require("./utlis/validate");
const { userAuth } = require("./middlewares/auth");

// middleware to parse JSON request bodies
app.use(express.json());
app.use(cookieParser());

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

// login dynamically
app.post("/login", async (req, res) => {
	const { emailId, password } = req.body;
	try {
		// validate input data
		validateLoginData(req);

		// find the user by emailId in the database
		const user = await User.findOne({ emailId: emailId });

		// check user is not existing
		if (!user) {
			throw new Error("Invalid credentials");
		}
		// compare password
		const isValidPassword = await user.comparePassword(password); // true / false

		// password is correct - true
		if (isValidPassword) {
			// create a jwt token
			const token = await user.getJWT();

			// add the token to cookie and send the response back to the user
			res.cookie("token", token, {
				expires: new Date(Date.now() + 7 * 24 * 3600000), // cookie expires after 7 days
			});
			res.send("User login successfully");
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});

app.get("/profile", userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
	const user = req.user;
	res.send(user?.firstName + " sent to connection request.");
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
