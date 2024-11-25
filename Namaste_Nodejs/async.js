// const fs = require("node:fs"); // nodejs core module - same thing
const fs = require("fs"); // nodejs core module
const https = require("https"); // nodejs core module

console.log("Asynchronous execution"); // Asynchronous I/O || Non-blocking I/O
let a = 343; // synchronous variable
let b = 398594;

// asynchronous function
https.get("https://dummyjson.com/products/1", (res) => {
	console.log("Fetched data successfully");
});

// asynchronous function
setTimeout(() => {
	console.log("setTimeout called after 5 seconds");
}, 5000);

// asynchronous function
fs.readFile("./file.txt", "utf8", (err, data) => {
	console.log("File Data : " + data);
});

// synchronous function - blocking this function to execute (Blocking I/O)
fs.readFileSync("./file.txt", "utf8", (err, data) => {
	console.log("File Data : " + data);
});

console.log("This well execute only after file read completes (readFileSync)");

// synchronous function
function multipleFn(a, b) {
	const result = a * b;
	return result;
}
let c = multipleFn(a, b);
console.log("Multiplication result is : " + c);
