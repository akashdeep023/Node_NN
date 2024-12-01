const express = require("express");
const app = express();

// This will match all the HTTP methods API methods to /user
// app.use("/user", (req, res) => {
// 	res.send("Hello from the user!");
// });

// This will only handle GET to /user
app.get("/user", (req, res) => {
	res.send({ firstName: "Akash", lastName: "Deep" });
});
// This will only handle POST to /user
app.post("/user", (req, res) => {
	res.send("User data successfully saved to the database");
});
// This will only handle DELETE to /user
app.delete("/user", (req, res) => {
	res.send("Deleted successfully");
});

// This will match all the HTTP methods API calls to /test
app.use("/test", (req, res) => {
	res.send("Hello from the test route");
});

app.listen(7777, () => {
	console.log("Server is successfully listening on 7777 port...");
});
