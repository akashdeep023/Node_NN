const express = require("express");
const app = express();

// Single route handler
// app.use("/user", (req, res) => {
// 	console.log("Handling the route user!");
// 	res.send("Response!");
// });

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

app.listen(7777, () => {
	console.log("Server is successfully listening on 7777 port...");
});
