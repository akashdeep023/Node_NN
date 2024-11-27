const http = require("http");

const server = http.createServer((req, res) => {
	if (req.url === "/getSecretData") {
		res.end("I have no secret data");
	}
	res.end("Hello, world!");
});

server.listen(7777);

// Create a server instance 😂😂😂
// Use native(node) module 'http' to create a server
// But very problem to handling errors, req and other.
