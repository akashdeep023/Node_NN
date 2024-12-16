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

### **create `POST` `/signup` API to add data to database**

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
