const mongoose = require("mongoose");
const validator = require("validator");

// Create a new User Schema
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 50,
			trim: true,
		},
		lastName: {
			type: String,
			minLength: 3,
			maxLength: 50,
			trim: true,
		},
		emailId: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid Email address : " + value);
				}
			},
		},
		password: {
			type: String,
			required: true,
			validate(value) {
				if (!validator.isStrongPassword(value)) {
					throw new Error("Enter a strong password : " + value);
				}
			},
		},
		age: {
			type: Number,
			min: 18,
		},
		gender: {
			type: String,
			validate(value) {
				if (!["male", "female", "other"].includes(value)) {
					throw new Error(
						"Invalid gender. Choose from male, female, or other."
					);
				}
			},
		},
		about: {
			type: String,
			default: "This is a about of the user!",
			trim: true,
			maxLength: 500,
		},
		skills: {
			type: [String],
			validate(value) {
				if (value.length > 10) {
					throw new Error("Maximum 10 skills are allowed!");
				}
			},
		},
		photoUrl: {
			type: String,
			default: "https://geographyandyou.com/images/user-profile.png",
			validate(value) {
				if (!validator.isURL(value)) {
					throw new Error("Invalid Photo URL : " + value);
				}
			},
		},
	},
	{
		timestamps: true,
	}
);

// Create a User Model
// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);
