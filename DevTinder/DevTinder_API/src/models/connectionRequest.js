const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema(
	{
		fromUserId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		toUserId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: {
				values: ["ignored", "interested", "accepeted", "rejected"],
				message: `{VALUE} is incorrect status type`,
			},
		},
	},
	{
		timestamps: true,
	}
);

// Index on fromUserId and toUserId to optimize queries.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Pre hook to validate if fromUserId and toUserId are not the same.
connectionRequestSchema.pre("save", function (next) {
	const connectionRequest = this;
	// Check if the fromUserId is same as toUserId
	if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
		throw new Error("Cannot send connection request to yourself!");
	}
	next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
