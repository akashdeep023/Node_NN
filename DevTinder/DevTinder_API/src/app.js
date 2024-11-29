const express = require("express");
const app = express();

// Request handlers --------------------------------
// app.use("/", (req, res) => {
// 	res.send("Hello from the server");
// });
app.use("/hello", (req, res) => {
	res.send("Hello from the hello route");
});
app.use("/test", (req, res) => {
	res.send("Hello from the test route");
});

app.listen(7777, () => {
	console.log("Server is successfully listening on 7777 port...");
});
