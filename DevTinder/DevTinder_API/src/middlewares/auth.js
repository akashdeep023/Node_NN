const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
	try {
		// get token from request cookies
		const { token } = req.cookies; // cookie-parser middleware add

		// check token is not existing
		if (!token) {
			throw new Error("Token is required");
		}

		// verify token and find the user
		const decodedObj = await jwt.verify(token, "DEV@Tinder_Secret");
		const { _id } = decodedObj;
		const user = await User.findById(_id);

		// check user is not existing
		if (!user) {
			throw new Error("Invalid token");
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
};

module.exports = { userAuth };
