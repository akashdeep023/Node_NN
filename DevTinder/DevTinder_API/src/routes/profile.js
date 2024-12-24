const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
	validateEditProfileData,
	validatePasswordData,
} = require("../utlis/validate");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
	try {
		// check fields is not valid
		if (!validateEditProfileData(req)) {
			throw new Error("Invalid profile field");
		}
		const loggedInUser = req.user;
		// update each profile field
		Object.keys(req.body).forEach(
			(key) => (loggedInUser[key] = req.body[key])
		);
		// save the profile
		await loggedInUser.save();
		res.json({
			message: `${loggedInUser.firstName}, your profile is updated successfully!`,
			data: loggedInUser,
		});
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
	try {
		const { password, newPassword } = req.body;
		const user = req.user;
		const isValidPassword = await user.comparePassword(password);
		if (!isValidPassword) {
			throw new Error("Invalid credentials");
		}
		validatePasswordData(req);
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();
		res.json({ message: "Password Updated successfully!" });
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});

module.exports = profileRouter;
