const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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

// Get the all users cards except
// 1. His own card
// 2. His connection -> accepted
// 3. Ignored users -> ignored
// 4. Already send tha connection request -> interested
// 5. Rejected users -> rejected
userRouter.get("/user/feed", userAuth, async (req, res) => {
	try {
		// Pagination
		const page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		limit = limit > 50 ? 50 : limit;
		const skip = (page - 1) * limit;

		// Find all user connection
		const connectionRequests = await ConnectionRequest.find({
			$or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
		}).select("fromUserId toUserId");

		// Create a new set of users to store userId (own, connection, ignored, request, rejected)
		let hideUserFromFeed = new Set();
		connectionRequests.forEach((c) => {
			hideUserFromFeed.add(c.fromUserId.toString());
			hideUserFromFeed.add(c.toUserId.toString());
		});

		const USER_SAFE_DATA =
			"firstName lastName photoUrl age gender about skills";
		const users = await User.find({
			$and: [
				{ _id: { $nin: Array.from(hideUserFromFeed) } }, // not his connection
				{ _id: { $ne: req.user._id } }, // not his own card
			],
		})
			.select(USER_SAFE_DATA)
			.skip(skip)
			.limit(limit);

		res.json({
			message: "Data fetched successfully",
			data: users,
		});
	} catch (err) {
		res.status(400).send("ERROR: " + err.message);
	}
});

module.exports = userRouter;
