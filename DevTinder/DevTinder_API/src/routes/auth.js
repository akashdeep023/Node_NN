const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData, validateLoginData } = require("../utlis/validate");
const authRouter = express.Router();

// signup
authRouter.post("/signup", async (req, res) => {
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

// login
authRouter.post("/login", async (req, res) => {
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

// logout
authRouter.post("/logout", (req, res) => {
	res.cookie("token", null, { expires: new Date(Date.now()) });
	res.send("User logout successfully");
});
module.exports = authRouter;
