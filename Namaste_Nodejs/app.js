// NodeJS is a JS runtime environment, and behind the scenes, it is using the v8 engine.

// V8 Engine -> ECMA Script Standard/Rules (JS -> ES6)
// Build with C++ Programming Language + Other Languages

// Nodejs -> V8 Engine + Node SuperPower (Global,Module,etc..)
// Build with C++ Programming Language + Javascript Languages + Other Languages

// Write & Execute any Code on Node REPL
// Node REPL -> Read + Evaluate + Print + Loop.
// Node REPL Command -> node

var name = "Namaste Nodejs";

var a = 10;
var b = 20;

// console.log(name);
// console.log(a + b);

// The window object is a global object provided by the browser, not by the V8 engine.
// Global Object in Browser (V8 Engine) -> window, this, self, frames, globalThis

// Node.js, the global object is known as global , which is equivalent to the window object in the browser.
// A global object is not a part of the V8 engine; instead, it’s a feature provided by Node.js.
// Global Object in Nodejs -> global, globalThis
// console.log(global);
// console.log(globalThis);
// console.log(this); // Empty Object

console.log(global === globalThis); // True

// Two types to export and import modules
// In package.json change type to change module export and import.
// {"type" = "commonjs"}                {"type" = "module"}
// Common JS Modules (cjs)              ES Modules / ES6 Modules (mjs)
// module.exports                       export
// require()                            import
// By default used NodeJs               By default used in React, Angular, Other framework
// Older way                            Newer way
// Synchronous                          Asynchronous
// Non Strict mode (a = 10;)            Strict mode (var a = 10;)

// require one module into another.

// Only Execute the module
// require("./calculate/sum.js"); // require("./calculate/sum") -> same thing

// const obj = require("./calculate/sum");
// console.log(obj.x);
// obj.calculateSum(10, 20);

// const { x, calculateSum } = require("./calculate/sum"); // Extract object
// const calculateMultiple = require("./calculate/multiply");
// const { calculateMultiple } = require("./calculate/multiply");

const { calculateSum, calculateMultiple, x } = require("./calculate"); // rap in a folder module

console.log(x);
calculateSum(10, 20);
calculateMultiple(10, 20);

// Require json file
const data = require("./data.json");

console.log(data);
