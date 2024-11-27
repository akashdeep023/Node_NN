const fs = require("fs");

// Synchronous code handles by v8 engine
const a = 100;

// Asynchronous code handles by libuv (check phase in event loop)
setImmediate(() => console.log("setImmediate"));

// Asynchronous code handles by libuv (poll phase in event loop)
fs.readFile("./file.txt", "utf8", () => {
	console.log("File Reading CB");
});

// Asynchronous code handles by libuv (timer phase in event loop)
setTimeout(() => console.log("Timer expired"), 0);

// Synchronous code handles by v8 engine
function printA() {
	console.log("a =", a);
}

// Synchronous code handles by v8 engine
printA();

// Synchronous code handles by v8 engine
console.log("Last line of the file.");

// In console.log --------------
// a = 100 (sync code execute first)
// Last line of the file
// Timer expired (1st phase start with timer)
// setImmediate (poll phase not executed because execute with some time, that's why execute setImmediate cb function)
// File Reading CB
