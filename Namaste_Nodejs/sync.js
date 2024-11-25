console.log("Synchronous execution");
let a = 343;
let b = 398594;
function multipleFn(a, b) {
	const result = a * b;
	return result;
}
let c = multipleFn(a, b);
console.log("Multiplication result is : " + c);
