const validator = require("validator");

const validateSignupData = (req) => {
	const { firstName, lastName, emailId, password } = req.body;
	if (!firstName || !lastName) {
		throw new Error("First name and last name are required");
	} else if (!validator.isEmail(emailId)) {
		throw new Error("Email address is not valid");
	} else if (!validator.isStrongPassword(password)) {
		throw new Error(
			"Password must be at least 8 characters long, contain a combination of uppercase and lowercase letters, numbers, and special characters"
		);
	}
};
const validateLoginData = (req) => {
	const { emailId, password } = req.body;
	if (!validator.isEmail(emailId)) {
		throw new Error("Email address is not valid");
	} else if (!validator.isStrongPassword(password)) {
		throw new Error("Passwords is not valid");
	}
};

module.exports = { validateSignupData, validateLoginData };
