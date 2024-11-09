function calculateMultiple(a, b) {
	var result = a * b;
	console.log(result);
}

// module.exports = calculateMultiple; //  default
module.exports = { calculateMultiple }; // rap in object
