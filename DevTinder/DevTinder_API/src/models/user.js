const mongoose = require("mongoose");

// Create a new User Schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	emailId: {
		type: String,
	},
	password: {
		type: String,
	},
	age: {
		type: Number,
	},
	gender: {
		type: String,
	},
});

// Create a User Model
// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);
