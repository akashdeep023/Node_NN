# **Class Notes & Home Work**

### **Create a repository (Project)**

-   Creating DevTinder_API

### **Initialize the repository**

-   Use command

```bash
npm init
```

### **node_modules**, package.json, package-lock.json

-   **Node Modules** - _All npm modules inside node_modules (node.js, express.js, nodemon)_
-   **Package.json** - _A folder containing a program described by a package.json file. (name, version, author, dependencies)_
-   **Package-lock.json** - _It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates._

### **Install express**

-   Use command

```bash
npm i express
```

### **Create a server**

```js
const express = require("express");
const app = express();

// Write request handler for "/test"
app.use("/test", (req, res) => {
	res.send("Hello from the test route");
});

// Listen to port 7777
app.listen(7777, () => {
	console.log("Server is successfully listening on 7777 port...");
});
```

### **Install nodemon and update scripts inside package. json**

-   Use command for nodemon installation

```bash
npm i -g nodemon
```

-   Update script inside package.json

```json
"scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
},
```

### **What is the use of "-g" while npm install**

-   Enables the npm CLI to install the package globally (Local machine).

### **What are dependencies**

-   **Dependencies** : _Packages required by your application in production._
-   **DevDependencies** : _Packages that are only needed for local._

### **Difference between caret(^) and tilde(~)**

-   major.minor.patch : x.y.z
-   caret(^) - Accept new minor and patch versions. `^1.2.3`is equivalent to >= `1.2.3` < `2.0.0`
-   tilde(~) - Accept new patch versions. `~1.2.3` is equivalent to >= `1.2.3` < `1.3.0`

### **How to close the server**

-   Use command

```bash
ctrl + C
```

### **Order of the routes matters a lot.**

-   Browser - _`/` route, Responce - `Hello from the server`_
-   Browser - _`/hello` route, Responce - `Hello from the server`_
-   Browser - _`/test` route, Responce - `Hello from the server`_
-   Browser - _`/xyz` route, Responce - `Hello from the server`_
-   _`/`, `/hello`, `/test` & `/xyz` routes match with 1st `/` route handler_

```js
app.use("/", (req, res) => {
	res.send("Hello from the server");
});
app.use("/hello", (req, res) => {
	res.send("Hello from the hello route");
});
app.use("/test", (req, res) => {
	res.send("Hello from the test route");
});
```

-   Browser - _`/` route, Responce - `Hello from the server`_
-   Browser - _`/hello` route, Responce - `Hello from the hello route`_
-   Browser - _`/test` route, Responce - `Hello from the test route`_
-   Browser - _`/xyz` route, Responce - `Hello from the server`_
-   _`/`, `/hello` & `/test` routes match with own route handler and `/xyz` route match with `/` route handler_

```js
app.use("/hello", (req, res) => {
	res.send("Hello from the hello route");
});
app.use("/test", (req, res) => {
	res.send("Hello from the test route");
});
app.use("/", (req, res) => {
	res.send("Hello from the server");
});
```

### **Write logic to handle GET, POST, PATCH, DELETE APIs calls and test them on POstman**

```js
// This will only handle GET to /user
app.get("/user", (req, res) => {
	res.send({ firstName: "Akash", lastName: "Deep" });
});
// This will only handle POST to /user
app.post("/user", (req, res) => {
	res.send("User data successfully saved to the database");
});
// This will only handle PATCH to /user
app.patch("/user", (req, res) => {
	res.send("Updated successfully");
});
// This will only handle DELETE to /user
app.delete("/user", (req, res) => {
	res.send("Deleted successfully");
});
```

### **Explore routing and use of `?`, `+` , `()`, `*` in the routes**

```js
// Explore Advance routing
// ? before letter -> exist ya not exist
// ab?c -> abc, ab
app.get("/ab?c", (req, res) => {
	res.send("Hello world!");
});

// ? before (string) -> exist ya not exist
// a(bc)?d -> abcd, ad
app.get("/a(bc)?d", (req, res) => {
	res.send("Hello world!");
});

// + before latter -> one time ya many times
// ab+c -> abc, abbc, abbbc, abbbbc, etc.
app.get("/ab+c", (req, res) => {
	res.send("Hello world!");
});

// + before (string) -> string one time ya many times
// a(bc)+d -> abcd, abcbcd, abcbcbcd, etc.
app.get("/a(bc)+d", (req, res) => {
	res.send("Hello world!");
});

// * -> replace "*" to any other string
// ab*c -> abc, abxc, abxyzc, abanythingc, etc.
app.get("/ab*c", (req, res) => {
	res.send("Hello world!");
});
```

### **Use of regex in routes `/a/` , `/.*fly$/`**

```js
// anywhere "a" exist in routing - handle
// Ex:- apple, a, man, leader, etc.
app.get(/a/, (req, res) => {
	res.send("Hello world!");
});

// end of "fly" in routing - handle
// Ex:- fly, dragonfly, butterfly, afly,etc.
app.get(/.*fly$/, (req, res) => {
	res.send("Hello world!");
});
```

### **Reading the query, params in the routes**

```js
// query
// Ex:- http://localhost:7777/user?name=akash
app.get("/user", (req, res) => {
	console.log(req.query); // { name: 'akash' }
	res.send("Hello world!");
});

// params
// Ex:- http://localhost:7777/user/101
app.get("/user/:userId", (req, res) => {
	console.log(req.params); // { userId: '101' }
	res.send("Hello world!");
});
```

### **Reading the dynamic routes**

```js
// dynamic routes
// Ex:- http://localhost:7777/user/101/akash
app.get("/user/:id/:name", (req, res) => {
	console.log(req.params); // { id: '101', name: 'akash' }
	res.send("Hello world!");
});
```

### **Use next() function**

-   Use `next()` function to call next route handler

### **next() function and errors along with res.send()**

-   When the `next()` function is used before or after the `res.send()` function -> got a error

### **Multiple Route Handlers - Play with the code**

```js
// Multiple routes handlers
app.use(
	"/user",
	(req, res, next) => {
		console.log("Handling the route user!");
		// next();
		// res.send("Response!");
		next();
	},
	(req, res, next) => {
		console.log("Handling the route user 2!");
		// res.send("2nd Response!");
		next();
	},
	(req, res, next) => {
		console.log("Handling the route user 3!");
		// res.send("3nd Response!");
		next();
	},
	(req, res, next) => {
		console.log("Handling the route user 4!");
		// res.send("4nd Response!");
		next();
	},
	(req, res, next) => {
		console.log("Handling the route user 5!");
		res.send("5nd Response!");
	}
);
```

### **app.use("/route", rH, [rH2, rH3], rH4, rh5);**

```js
// Same behaviour - route-handler rapping in tha array
// rH, rH2, rH3, rH4, rH5 -> route-handler
app.use("/route", [rH, rH2, rH3, rH4, rh5]);
// ya
app.use("/route", rH, [rH2, rH3], rH4, rh5);
// ya
app.use("/route", [rH, rH2, rH3], rH4, rh5);
```

### **What is a Middleware? Why do we need it?**

-   In Node.js, middleware is a function that acts as an intermediary between software layers, processing requests and responses
-   The main purpose of the middleware is to modify the req and res objects, and then compile and execute any code that is required.

### **Difference `app.use` and `app.all`**

-   `app.use()` will match any URL that starts with the path.
-   `app.all()` will only match a URL path that is exactly equal to the specified path

```js
app.all("/test", fn1); // route 1
app.use("/test", fn2); // route 2
// http://yourhost.com/test - both route1 and route2 will match
// http://yourhost.com/test/1 - only route2 will match
```

### **Write a dummy auth middleware for admin**

```js
// Admin Middleware
app.use("/admin", (req, res, next) => {
	const token = "xyz";
	const isAdminAuth = token === "xyz";
	if (!isAdminAuth) {
		res.status(401).send("unauthorized");
	} else {
		next();
	}
});

// Admin routes
app.get("/admin/allData", (req, res) => {
	res.send("All data sent!");
});
app.get("/admin/delete", (req, res) => {
	res.send("Deleted!");
});
```

### **Write a dummy auth middleware for all user routes, except /user/login**

```js
// User Middleware
const userAuth = (req, res, next) => {
	const token = "xyz";
	const isUserAuth = token === "xyz";
	if (!isUserAuth) {
		res.status(401).send("unauthorized");
	} else {
		next();
	}
};

// User routes
app.get("/user/data", userAuth, (req, res) => {
	res.send("Data sent!");
});
app.get("/user/login", (req, res) => {
	res.send("Login!");
});
```

### **Error Handling using `app.use("/", (err, req, res, next) = {});`**

```js
// Error handling
// using middleware or try catch block
app.use("/", (err, req, res, next) => {
	if (err) {
		res.status(500).send("Something went wrong");
	}
});
```

### **Parameters in the request headers**

`2 parameters` -> `req`, `res` \
`3 parameters` -> `req`, `res`, `next` \
`4 parameters` -> `err`, `req`, `res`, `next`

### **Create a free cluster on MongoDB official website (Mongo Atlas)**

-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### **Install mongoose library**

```bash
npm i mongoose
```

### **Connect your application to the Database "Connection-url"/devTinder**

```js
const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect("mongodb://localhost:27017/devTinder");
};

module.exports = connectDB;
```

### **Call the connectDB function and connect to database before starting application on 7777**

```js
connectDB()
	.then(() => {
		console.log("Database connection established...");
		app.listen(7777, () => {
			console.log("Server is successfully listening on 7777 port...");
		});
	})
	.catch((err) => {
		console.error(err);
	});
```

### **Create a userSchema & userModel**

```js
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
```

### **Create `POST` `/signup` API to add data to database**

```js
const User = require("./models/user");
// signup
app.post("/signup", async (req, res) => {
	// create a new user (instance) of the User model
	const user = new User({
		firstName: "Akash",
		lastName: "Kumar",
		emailId: "ak@gmail.com",
		password: "Akash@123",
	});
	try {
		// save the user to the database
		await user.save();
		// return a success response
		res.send("User created successfully");
	} catch (err) {
		// return an error response if the save operation fails
		res.status(500).send(
			"Server error while creating user : " + err.message
		);
	}
});
```

### **Difference between `JS object` vs `JSON`**

-   **Javascript Objects** : _The syntax is more lenient, allowing unquoted property names, comments, and trailing commas. they can also contain symbols as keys and support methods._
-   **JSON** : _JSON follows a stricter syntax, requiring double-quoted property names, disallowing trailing commas, and excluding comments._

### **Add the `express.json` middleware to your app**

```js
// middleware to parse JSON request bodies
app.use(express.json());
```

### **Make your signup API dynamic to recive data from the end user**

```js
// signup dynamically
app.post("/signup", async (req, res) => {
	console.log(req.body);
	// create a new user (instance) of the User model
	const user = new User(req.body);
	try {
		// save the user to the database
		await user.save();
		// return a success response
		res.send("User created successfully");
	} catch (err) {
		// return an error response if the save operation fails
		res.status(500).send(
			"Server error while creating user : " + err.message
		);
	}
});
```

### **User.findOne with duplucate email ids, which object returned**

```js
// get filter users in the database
app.get("/user", async (req, res) => {
	try {
		// single user found by emailId - findOne({ emailId: email})
		const user = await User.findOne({ emailId: req.body.emailId });
		if (!user) {
			res.status(404).send("User not found.");
		} else {
			res.send(user);
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **API - Get user by email**

```js
// get filter users in the database
app.get("/user", async (req, res) => {
	try {
		// array of users found by emailId - find({ emailId: email})
		const users = await User.find({ emailId: req.body.emailId });
		if (users.length > 0) {
			res.send(users);
		} else {
			res.status(404).send("No users found.");
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **API - Feed API - GET /feed - get all the users from the database**

```js
// get all users in the database - array of users
app.get("/feed", async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **API - Get user by ID**

```js
// get user in the database by id - user object
app.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("No users found.");
		} else {
			res.send(user);
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **API - Delete a user**

```js
// Delete a user
app.delete("/user", async (req, res) => {
	const userId = req.body.userId;
	try {
		// await User.findByIdAndDelete({ _id: userId });
		await User.findByIdAndDelete(userId); // samething as above line
		res.send("User deleted successfully");
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **Difference between PATCH and PUT**

-   **PATCH** : _A PATCH request is used to **partially** update a resource. This means you only need to send the data that you want to change, without affecting the rest of the resource._
-   **PUT** : _A PUT request is used to update an **entire** resource on the server. When you use a PUT request, you are telling the server to completely replace the existing data with the new data you provide._

### **API - Update a user**

```js
// Update a user
app.patch("/user", async (req, res) => {
	const userId = req.body.userId;
	const data = req.body;
	try {
		// const user = await User.findByIdAndUpdate(userId, data);
		// 3rd parameter is optional
		const user = await User.findByIdAndUpdate(userId, data, {
			returnDocument: "after", // use before , after
		});
		console.log(user);
		res.send("User updated successfully");
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **Explore the Mongoose Documention for Model methods**

-   [Mongoose Model Docs](https://mongoosejs.com/docs/api/model)

### **Explore schematype options from the documention**

-   [Mongoose SchemaTypes Docs](https://mongoosejs.com/docs/schematypes.html)

### **Add `required`, `unique`, `lowercase`, `min`, `minLength`, `trim`, `default` value, other options.**

-   Improve the DB schema : _PUT all appropiate validations on each field in Schema_

```js
const userSchema = new mongoose.Schema({
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
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		min: 18,
	},
	gender: {
		type: String,
	},
	about: {
		type: String,
		default: "This is a about of the user!",
		trim: true,
		maxLength: 500,
	},
	skills: {
		type: [String],
	},
});
```

### **Create a custom `validate` function for gender**

-   new document : _validate function run always_
-   Update document (findByIdAndUpdate()) : _runValidators if true, run validate function else not_

```js
// User Schema field
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
```

```js
// model.findByIdAndUpdate()
const user = await User.findByIdAndUpdate(userId, data, {
	returnDocument: "after", // use before , after
	runValidators: true, // run validator function
});
```

### **Add `timestamps` to the userSchema**

```js
const userSchema = new mongoose.Schema(
	{
		// Schema fields
	},
	{
		timestamps: true,
	}
);
```

### **DATA Sanitizing - Add API level validation on Patch request api**

```js
// Update a user
app.patch("/user/:userId", async (req, res) => {
	const userId = req.params?.userId;
	const data = req.body;
	try {
		// Validate fields
		const ALLOWED_FIELDS = ["age", "gender", "about", "skills", "photoUrl"];
		const isAllowField = Object.keys(data).every((key) =>
			ALLOWED_FIELDS.includes(key)
		);
		if (!isAllowField) {
			throw new Error("Invalid field value for user");
		}
		if (!data?.skills.length > 10) {
			throw new Error("Skills cannot be more than 10");
		}
		const user = await User.findByIdAndUpdate(userId, data, {
			returnDocument: "after",
			runValidators: true,
		});
		console.log(user);
		res.send("User updated successfully");
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error while retrieving users.");
	}
});
```

### **Install validator**

```bash
npm install validator
```

### **Explore validator library funcation and Use vlidator funcs for password, emailId, photoUrl**

-   [Validator Package](https://npmjs.com/package/validator)

```js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: // first name,
        lastName: // last name,
        emailId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // emailId validate using validator library
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email address : " + value);
                }
            },
        },
        password: {
            type: String,
            required: true,
            // password validate using validator library
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter a strong password : " + value);
                }
            },
        },
        age: // age,
        gender: // gender,
        about: // about
        skills: // skills
        photoUrl: {
            type: String,
            default: "https://geographyandyou.com/images/user-profile.png",
            // photoUrl validate using validator library
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

module.exports = mongoose.model("User", userSchema);
```

### **Validate data in Signup API**

```js
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

module.exports = { validateSignupData };
```

### **Install bcrypt package**

-   Use command

```bash
npm install bcrypt
```

### **Create PasswordHash using `bcrypt.hash` & save the user is excrupted password**

```js
const bcrypt = require("bcrypt");
const { validateSignupData } = require("./utlis/validate");

app.post("/signup", async (req, res) => {
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
```

### **Create `POST` `/login` API**

```js
// login dynamically
app.post("/login", async (req, res) => {
	const { emailId, password } = req.body;
	try {
		// validate input data
		validateLoginData(req);

		// find the user by emailId in the database
		const user = await User.findOne({ emailId: emailId });
		if (!user) {
			throw new Error("Invalid credentials");
		}
		// compare password
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (isValidPassword) {
			res.send("User login successfully");
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});
```

### **Install cookie-parser**

-   Use command

```bash
npm install cookie-parser
```

### **Create `GET` `/profile` APi and check if you get the cookie back**

```js
const cookieParser = require("cookie-parser");

// middleware use to parse the cookie
app.use(cookieParser());

app.get("/profile", async (req, res) => {
	try {
		// get token from request cookies
		const { token } = req.cookies; // cookie-parser middleware add
		console.log(token);

		res.send("Cookies reading");
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});
```

### **Install jsonwebtoken**

-   Use command

```bash
npm install jsonwebtoken
```

### **IN Login API, after email and password validation, create e JWT token and send it to user in cookies**

```js
const jwt = require("jsonwebtoken");

// login
app.post("/login", async (req, res) => {
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
		const isValidPassword = await bcrypt.compare(password, user.password); // true / false

		// password is correct - true
		if (isValidPassword) {
			// create a jwt token
			const token = await jwt.sign(
				{ _id: user._id },
				"DEV@Tinder_Secret"
			);

			// add the token to cookie and send the response back to the user
			res.cookie("token", token);
			res.send("User login successfully");
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});
```

### **Read the cookies inside your `/profile` API and find the logged in user**

```js
app.get("/profile", async (req, res) => {
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
		res.send(user);
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});
```

### **userAuth Middleware**

```js
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
```

### **Add the userAuth middle ware in profile API and a new sendConnectionRequest API**

-   `/profile` API

```js
app.get("/profile", userAuth, async (req, res) => {
	try {
		const user = req.user;
		res.send(user);
	} catch (err) {
		res.status(500).send("ERROR : " + err.message);
	}
});
```

-   `/sendConnectionRequest` API

```js
app.post("/sendConnectionRequest", userAuth, (req, res) => {
	const user = req.user;
	res.send(user?.firstName + " sent to connection request.");
});
```

### **Set the expiry of JWT token and cookies to 7 day**

```js
const token = await jwt.sign(
	{ _id: user._id },
	"DEV@Tinder_Secret",
	{ expiresIn: "7d" } // token expires after 7 days
);

res.cookie("token", token, {
	expires: new Date(Date.now() + 7 * 24 * 3600000), // cookie expires after 7 days
});
```

### **Create userSchema method to `getJWT()`**

```js
userSchema.methods.getJWT = async function () {
	const user = this; // this keyword represents to current user object
	const token = jwt.sign({ _id: user._id }, "DEV@Tinder_Secret", {
		expiresIn: "7d",
	});
	return token;
};
```

### **Create userSchema method to `comparePassword(passwordInputByUser)`**

```js
userSchema.methods.comparePassword = async function (passwordInputByUser) {
	const user = this;
	const isValidPassword = await bcrypt.compare(
		passwordInputByUser,
		user.password // this.password
	);
	return isValidPassword;
};
```

### **Read documentation for express.Router**

-   [Express Router](https://expressjs.com/en/api.html#router)

### **Create routes folder for managing auth, profile, request routers**

-   `routes/auth.js`
-   `routes/profile.js`
-   `routes/request.js`

### **create authRouter, profileRouter, requestRouter**

-   `authRouter`

```js
const express = require("express");
const authRouter = express.Router();

// signup
authRouter.post("/signup", () => {
	// do something
});

// login
authRouter.post("/login", () => {
	// do something
});

module.exports = authRouter;
```

-   `profileRouter`

```js
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();

// profile
profileRouter.post("/profile", userAuth, () => {
	// do something
});

module.exports = profileRouter;
```

-   `requestRouter`

```js
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

// request
requestRouter.post("/request", userAuth, () => {
	// do something
});

module.exports = requestRouter;
```

### **Import these routers in app.js**

```js
// import router
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// use router middlewares
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
```

### **Create POST `/logout` API**

```js
// logout
authRouter.post("/logout", (req, res) => {
	res.cookie("token", null, { expires: new Date(Date.now()) });
	res.send("User logout successfully");
});
```

### **Create PATCH `/profile/edit`**

```js
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
```

### **Create PATCH `/profile/password` API = forgot password API**

```js
// validate.js file
const validatePasswordData = (req) => {
	const { newPassword } = req.body;
	if (!validator.isStrongPassword(newPassword)) {
		throw new Error(
			"Password must be at least 8 characters long, contain a combination of uppercase and lowercase letters, numbers, and special characters"
		);
	}
};

// routes/profile.js file
const { validatePasswordData } = require("../utlis/validate");
const bcrypt = require("bcrypt");

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
```

### **Make you validate all data in PATCH api**

```js
const validateEditProfileData = (req) => {
	const allowedEditFields = [
		"firstName",
		"lastName",
		"emailId",
		"age",
		"gender",
		"about",
		"skills",
		"photoUrl",
	];
	const isEditAllowed = Object.keys(req.body).every((field) =>
		allowedEditFields.includes(field)
	);
	return isEditAllowed;
};
module.exports = {
	validateEditProfileData,
};
```

### **Create Connnection Request Schema**

```js
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
				values: ["ignored", "interested", "accepted", "rejected"],
				message: `{VALUE} is incorrect status type`,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
```

### **Send Connection Request API**

```js
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
				message:
					req.user.firstName + " " + status + " " + toUser.firstName,
				data,
			});
		} catch (err) {
			res.status(400).send("ERROR: " + err.message);
		}
	}
);
```

### **Proper validation of Data**

-   Validate all request `req object` data to send by user.

### **Think about ALL corner cases**

-   check status is valid or not
-   check user exists in the database
-   check connection request already exists between the two users

### **$or query $and query in mongoose**

-   [Mongoose Logical Operator](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)

### **schema.pre("save") function**

```js
// Pre hook to validate if fromUserId and toUserId are not the same.
connectionRequestSchema.pre("save", function (next) {
	const connectionRequest = this;
	// Check if the fromUserId is same as toUserId
	if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
		throw new Error("Cannot send connection request to yourself!");
	}
	next();
});
```

### **Read more about indexes in MongoDB**

-   [Mongoose indexes](https://www.mongodb.com/docs/manual/core/indexes/)

### **Why do we need index in DB?**

-   Indexes contain all the necessary information needed to access items _quickly_ and _efficiently_. Indexes serve as lookup tables to efficiently store data for quicker retrieval.

### **What is the Advantages and Disadvantages of Indexes in MongoDB?**

**✅ Advantages:**

1. **Faster Queries:** Quick retrieval of documents.
2. **Efficient Sorting:** Optimized `sort()` operations.
3. **Faster Updates:** Speedy updates on indexed fields.
4. **Unique Constraints:** Prevent duplicate values.
5. **Aggregation Optimization:** Faster `$group`, `$sort`.
6. **Full-text Search:** Supports text search efficiently.
7. **Geospatial Queries:** Optimized for location-based data.

**❌ Disadvantages:**

1. **Increased Disk Usage:** Indexes consume extra storage.
2. **Slower Writes:** Inserts, updates, and deletes take longer.
3. **Maintenance Overhead:** Indexes need to stay updated.
4. **Complex Management:** Over-indexing hurts performance.
5. **Index Bloat:** Unmanaged indexes grow inefficient.
6. **Query Plan Overhead:** More indexes can confuse query optimization.

### **Read this arcticle about compond indexes in MongoDB and How to use.**

-   [Mongoose indexes](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/)

```js
// Index on fromUserId and toUserId to optimize queries.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
```

### **ALWAYS THINK ABOUT CORNER CASES**

-   **Security:** Prevent SQL/NoSQL injection, XSS attacks, and sensitive data exposure.
-   **Authentication & Authorization:** Handle expired tokens, permission checks, and unauthenticated access.
-   **Input Validation:** Validate required fields, data types, boundary values, and payload sizes.
-   **Error Handling:** Use proper HTTP status codes, meaningful error messages, and a consistent error format.
-   **Performance:** Optimize queries, set timeouts, limit payload sizes, and use caching efficiently.

### **Write code with proper validations for POST /request/review/:status/:requestId**

```js
requestRouter.post(
	"/request/review/:status/:requestId",
	userAuth,
	async (req, res) => {
		try {
			const loggedInUser = req.user;
			const { status, requestId } = req.params;
			const allowedStatus = ["accepted", "rejected"];

			if (!allowedStatus.includes(status)) {
				return res
					.status(400)
					.json({ message: "Invalid status type: " + status });
			}
			const connectionRequest = await ConnectionRequest.findOne({
				_id: requestId,
				toUserId: loggedInUser._id,
				status: "interested",
			});
			if (!connectionRequest) {
				return res
					.status(400)
					.json({ message: "Invalid connection request" });
			}
			connectionRequest.status = status;
			const data = await connectionRequest.save();
			res.json({
				message: "Connection request " + status,
				data,
			});
		} catch (err) {
			res.status(400).send("ERROR: " + err.message);
		}
	}
);
```

### **Read about ref and populate**

-   [Ref & Populate](https://mongoosejs.com/docs/populate.html)

### **Create GET /user/requests/received API**

```js
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
```

### **Create GET /user/connections API**

```js
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
```

### **Create GET /user/feed API**

```js
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
```
