const crypto = require("crypto"); // node core module

console.log("SetTimeout execution");

let a = 29924;
let b = 398294839;

// This callback will only be pushed to call stack in v8 once the call stack is empty.
// Asynchronous function - this function handles libuv
setTimeout(() => {
	console.log("Call me right now");
}, 0); // It will only be called once call stack of main thread is empty

setTimeout(() => {
	console.log("Call me after 3 seconds");
}, 3000);

function multipleFn(a, b) {
	const result = a * b;
	return result;
}
let c = multipleFn(a, b);
console.log("Multiplication result is : " + c);
