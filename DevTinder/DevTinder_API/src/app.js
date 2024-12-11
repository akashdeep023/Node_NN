const express = require("express");
const app = express();

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

app.get("/admin/allData", (req, res) => {
	res.send("All data sent!");
});
app.get("/admin/delete", (req, res) => {
	res.send("Deleted!");
});

// userAuth - middleware
app.get("/user/data", userAuth, (req, res) => {
	res.send("Data sent!");
});
app.get("/user/login", (req, res) => {
	res.send("Login!");
});

// Parameters in the request headers
// 2 parameters -> request, response
// 3 parameters -> request, response, next
// 4 parameters -> error, request, response, next

app.get("/dashboard", (req, res) => {
	console.log("/dashboard route");
	throw new Error("dashboard route not available");
});

// Error handling
// using middleware or try catch block
app.use("/", (err, req, res, next) => {
	if (err) {
		res.status(500).send("Something went wrong");
	}
});

app.listen(7777, () => {
	console.log("Server is successfully listening on 7777 port...");
});
