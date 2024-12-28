const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");
const userRouter = express.Router();

// Get the all pending connection requests for the loggedIn user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
	try {
		const connectionRequest = await ConnectionRequest.find({
			toUserId: req.user._id,
			status: "interested",
		}).populate(
			"fromUserId",
			"firstName lastName photoUrl age gender about skills"
		); // second parameter is a string inside fields

		// .pupulate("fromUserId",
		// ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"]
		// ); // second parameter is array inside fields

		res.json({
			message: "Data fetched successfully",
			data: connectionRequest,
		});
	} catch (err) {
		res.status(400).send("ERROR: " + err.message);
	}
});

// Get the all my connection requests
userRouter.get("/user/connections", userAuth, async (req, res) => {
	try {
		const USER_SAFE_DATA =
			"firstName lastName photoUrl age gender about skills";
		const allConnections = await ConnectionRequest.find({
			$or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
			status: "accepted",
		})
			.populate("fromUserId", USER_SAFE_DATA)
			.populate("toUserId", USER_SAFE_DATA);

		const data = allConnections.map((row) => {
			if (row.fromUserId._id.toString() == req.user._id.toString()) {
				return row.toUserId;
			}
			return row.fromUserId;
		});
		res.json({
			message: "Data fetched successfully",
			data,
		});
	} catch (err) {
		res.status(400).send("ERROR: " + err.message);
	}
});

module.exports = userRouter;
