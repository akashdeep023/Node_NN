const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
	"/request/send/:status/:toUserId",
	userAuth,
	async (req, res) => {
		try {
			const fromUserId = req.user._id;
			const toUserId = req.params.toUserId;
			const status = req.params.status;

			const allowedStatus = ["ignored", "interested"];
			if (!allowedStatus.includes(status)) {
				return res
					.status(400)
					.json({ message: "Invalid status type: " + status });
			}

			// check if user exists in the database
			const toUser = await User.findById(toUserId);
			if (!toUser) {
				return res.status(404).json({ message: "User not found!" });
			}

			// check if connection request already exists between the two users
			const existingConnectionRequest = await ConnectionRequest.findOne({
				$or: [
					{ fromUserId, toUserId }, // { fromUserId: fromUserId, toUserId: toUserId },
					{ fromUserId: toUserId, toUserId: fromUserId },
				],
			});
			if (existingConnectionRequest) {
				return res
					.status(400)
					.send({ message: "Connection Request Already Exists!!" });
			}

			// create a new connection request and save it to the database
			const connectionRequest = new ConnectionRequest({
				fromUserId,
				toUserId,
				status,
			});
			const data = await connectionRequest.save();
			res.json({
				message: req.user.firstName + status + toUser.firstName,
				data,
			});
		} catch (err) {
			res.status(400).send("ERROR: " + err.message);
		}
	}
);
module.exports = requestRouter;
