// Modules protect their variables & functions from leaking

console.log("Sum Module Executed");

var x = "Hello, world!";

function calculateSum(a, b) {
	var sum = a + b;
	console.log(sum);
}

// console.log(module.exports); // Empty object -> {}

// module.exports = calculateSum; // exports single function

// module.exports = { // exports variable & function (multiple)
// 	x: x,
// 	calculateSum: calculateSum,
// };

// module.exports.x = x;
// module.exports.calculateSum = calculateSum;

module.exports = { x, calculateSum }; // sort form
