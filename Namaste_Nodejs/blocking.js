const crypto = require("crypto"); // node core module

console.log("Blocking execution"); // Blocking I/O

let a = 45392843;
let b = 398594;

// pdkdf2 - Password-Based Key Derivation Function 2

// Synchronous function - will BLOCK the MAIN THREAD - Don't use it
crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");
console.log("First key is generated");

setTimeout(() => {
	console.log("Call me right now");
}, 0); // It will only be called once call stack of main thread is empty

// Async hronous function - this function handles libuv
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
	console.log("Second key is generated");
});

function multipleFn(a, b) {
	const result = a * b;
	return result;
}
let c = multipleFn(a, b);
console.log("Multiplication result is : " + c);
