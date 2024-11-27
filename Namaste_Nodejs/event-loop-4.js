const fs = require("fs");

// Asynchronous code handles by libuv (check phase in event loop)
setImmediate(() => console.log("setImmediate"));

// Asynchronous code handles by libuv (timer phase in event loop)
setTimeout(() => console.log("Timer expired"), 0);

// Asynchronous code handles by libuv (inner loop in event loop)
Promise.resolve("Promise").then(console.log);

// Asynchronous code handles by libuv (poll phase in event loop)
fs.readFile("./file.txt", "utf8", () => {
	console.log("File Reading CB");
});

// Asynchronous code handles by libuv (inner loop in event loop)
process.nextTick(() => {
	process.nextTick(() => console.log("Inner process.nextTick"));
	console.log("process.nextTick");
});

// Synchronous code handles by v8 engine
console.log("Last line of the file.");

// In console.log --------------
// Last line of the file
// process.nextTick (event loop start with process.nextTick)
// Inner process.nextTick (higher priority of process.nextTick, executed immediately of process.nextTick after process.nextTick)
// Promise
// Timer expired (1st phase start with timer)
// setImmediate (poll phase not executed because execute with some time, that's why execute setImmediate cb function)
// File Reading CB (in poll phase)
