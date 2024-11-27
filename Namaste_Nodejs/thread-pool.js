const crypto = require("crypto");

// Update thread-pool size
// process.env.UV_THREADPOOL_SIZE = 2;

crypto.pbkdf2("password", "salt", 550000, 50, "sha512", (err, key) => {
	console.log("1 key is generated");
});
crypto.pbkdf2("password", "salt", 550000, 50, "sha512", (err, key) => {
	console.log("2 key is generated");
});
crypto.pbkdf2("password", "salt", 550000, 50, "sha512", (err, key) => {
	console.log("3 key is generated");
});
crypto.pbkdf2("password", "salt", 550000, 50, "sha512", (err, key) => {
	console.log("4 key is generated");
});
crypto.pbkdf2("password", "salt", 550000, 50, "sha512", (err, key) => {
	console.log("5 key is generated");
});

// thread-pool default size = 4
// console.log - 4 callback function execute after x time then execute 5th callback function

// change thread-pool size = 8
// console.log - max 8 callback function execute after x time then execute 9th or other callback function

// change thread-pool size = 2
// console.log - max 2 callback function execute after x time then execute 3th or other callback function

// no any order to print results because any callback function is returned then execute
