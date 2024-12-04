const express = require("express");
const app = express();

// Explore Advance routing
// app.get("/abc", (req, res) => {
// 	res.send("Hello world!");
// });

// ab?c -> abc, ab
// app.get("/ab?c", (req, res) => {
// 	res.send("Hello world!");
// });

// a(bc)?d -> abcd, ad
// app.get("/a(bc)?d", (req, res) => {
// 	res.send("Hello world!");
// });

// ab+c -> abc, abbc, abbbc, abbbbc, etc.
// app.get("/ab+c", (req, res) => {
// 	res.send("Hello world!");
// });

// a(bc)+d -> abcd, abcbcd, abcbcbcd, etc.
// app.get("/a(bc)+d", (req, res) => {
// 	res.send("Hello world!");
// });

// ab*c -> abc, abxc, abxyzc, abanythingc, etc.
// app.get("/ab*c", (req, res) => {
// 	res.send("Hello world!");
// });

// Use regex in routing
// anywhere "a" exist in routing - handle
// Ex:- apple, a, man, leader, etc.
// app.get(/a/, (req, res) => {
// 	res.send("Hello world!");
// });

// end of "fly" in routing - handle
// Ex:- fly, dragonfly, butterfly, afly,etc.
app.get(/.*fly$/, (req, res) => {
	res.send("Hello world!");
});

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

// dynamic routes
// Ex:- http://localhost:7777/user/101/akash
app.get("/user/:id/:name", (req, res) => {
	console.log(req.params); // { id: '101', name: 'akash' }
	res.send("Hello world!");
});

app.listen(7777, () => {
	console.log("Server is successfully listening on 7777 port...");
});
