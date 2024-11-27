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

// JavaScript -> Synchronous Single Thread Language
// JavaScript is a synchronous, single-threaded language, meaning there is only one thread in which the JavaScript engine (such as the V8 engine) runs. In JavaScript, code is executed line by line within this single thread.
// So, if you're executing line 2 in JavaScript, it will only run after line 1 has finished executing. This is the essence of synchronous execution: each task is performed one after the other, without overlap.

// Q: What is a Synchronous System?
// In a synchronous system, tasks are completed one after another.
// Ex -
// let a = 343;
// let b = 398594;
// function multipleFn(a, b) {
// 	const result = a * b;
// 	return result;
// }
// let c = multipleFn(a, b);
// console.log(c);

// Q: What is an Asynchronous System?
// In this system, tasks are completed independently.
// Ex -
// https.get("https://api.fbi.com", (res) => {
// 	console.log(res?.secret);
// });
// setTimeout(() => {
// 	console.log("setTimeout");
// }, 5000);
// fs.readFile("./path.txt", "utf8", (data) => {
// 	console.log("File Data : " + data);
// });

// So, JavaScript itself is synchronous, but with the power of Node.js, it can handle asynchronous operations, allowing JavaScript to perform multiple tasks concurrently
// libuv performs these heavy tasks in the background, ensuring that asynchronous operations continue to be managed effectively.
// In summary, Node.js excels in handling asynchronous I/O operations, thanks to its non-blocking I/O model.

// sync.js file
// async.js file
// blocking.js file

// Node.js architecture
// v8 Js engine + libuv + other libraries
// ---------------------------------------------------------------------node.js------------------------------------------------------------------
// -------------------------- v8 js engine -------------------------------- ------------------------------ libuv --------------------------------
//                                                                         |
//                                     (MEMORY HEAP)                       |
//     |           |      |⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻|        |         |⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻|
//     |           |      |  ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢  |        |         |                        |
//     |           |      |  ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢  |        |         |      (EVENT LOOP)      |              (THREAD POOL)
//     |           |      |  ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢  |        |         |                        |
//     |           |      |  ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢  |        |         |________________________|
//     |           |      |_______________________________________|        |                                               |⁻⁻⁻⁻|     |⁻⁻⁻⁻|
//     |           |                                                       |                                               |____|     |____|
//     |           |      |⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻|        |         |⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
//     |___________|      |           GARBAGE                     |        |         |________________________             |⁻⁻⁻⁻|     |⁻⁻⁻⁻|
//     |main thread|      |           COLLECTOR                   |        |         |                                     |____|     |____|
//     |___________|      |_______________________________________|        |         |⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
//                                                                         |         |________________________         (DEFAULT THREADPOOL SIZE = 4)
//     (CALL STACK)                                                        |            (CALLBACK QUEUES)
//
// ----------------------------------------------------------------------------------------------------------------------------------------------
//
// 2 Types of Languages
// 1. interpreted                              2. Compiled
// Read the code line by line and execute it    First compilation of all code then execution (HL code -> LL code (Machine code))
// Fast initial execution                       Initial heavy but executed fast
// interpreter                                 Compilers
// Ex - Python, Ruby, etc.                      Ex - Java, c, c++, Go, etc.

// JavaScript is JIT (Just in time) compilation language.

// How to execute code in v8 engine (JIT compilation) (V8 architecture)
// A. Parsing stage
//    1. Lexical analysis (Tokenization)
//       - code -> token
//    2. Syntax analysis (Parsing)
//       - token -> AST (Abstract syntax tree)
// B. Optimization
//  AST (Abstract syntax tree)
//      ↓                       (optimization)
//      (Ignition interpreter)  ————————→  (Turbofan Compiler)
//           |            ↑                        ↓
//           |             ←———————————————————————
//           ↓                (de optimization)    ↓
//      (Byte code)                         (Optimised Machine code)
//           ↓                                     ↓
//           ————————————→ (Execution) ←————————————
//
// Garbage collector run (Orinoco,Oilpan,Scavenger)
// Chached

// Libuv Event Loop
// Libuv event loop have many phases
// Major phases have event loop
// 1. timer - setTimeout, setInterval
// 2. poll - fs.readFile(), https.get()
// 3. check - setImmediate
// 4. close - socket.close()

// and several callbacks queues (timer cb, poll cb, check cb, close cb)

// process.nextTick —→ promise callback —→ timer
// —→ process.nextTick —→ promise callback —→ poll
// —→ process.nextTick —→ promise callback —→ check
// —→ process.nextTick —→ promise callback —→ close
// —→ process.nextTick —→ promise callback —→ .....  in loop

// v8 engine call stack is empty then run event loop callback function otherwise wait for v8 call stack is empty

//         —————————————→ timer —————————————→
//        ↑                                   |
//        |      —→ process.nextTick() —→     |
//        |     ↑                        |    ↓
//      close   |                        |   poll (event loop wait if do nothing)
//        ↑     |                        ↓    |
//        |      ←—— promise callback ←——     |
//        |                                   ↓
//         ←————————————— check  ←—————————————

// event loop start with process.nextTick callback function then promise callback function
// and every phase after run inner circle callback function

// phases start with timer callback function
// event loop wait poll callback function if do nothing
// and phase run timer —→ poll —→ check —→ close

// process.nextTick callback function - execute immediately
// promise callback function - execute immediately
// timer callback function - depended on time
// poll callback function - execution some time

// One full cicle is known as TICK

// event-loop-1.js file
// event-loop-2.js file
// event-loop-3.js file
// event-loop-4.js file

// Liveuv Thread pool
// uv-thread-pool default size = 4
// How to change thread-pool size - process.env.THREADPOOL_SIZE = 8 (Any integer number)

// Thread-pool work - fs, dns.lookup, crypto, etc.

// Is Node.js single threaded or multi-threaded?
// Ans: Depending on how you are using node.js, What code is running on node.js
// synchronous code —→ single-threaded node.js
// asynchronous code —→ multi-threaded node.js

// thread-pool.js file

// How to connect thread-pool to OS (Operating system)
// epool (linux), kqueue (macos), other kernel
// Scalable I/O event notification mechanism

// File descriptor/ Socket descriptor

// DON'T BLOCK THE MAIN THREAD
// DON'T USE - (sync method, heavy json object, complex Regex, complex calculations/loop, etc.)

// DATA STRUCTURE IS IMPORTANT
// epool use - red black tree
// timer - min heap

// NAMING IS VERY IMPORTANT

// THERE'S A LOT TO LEARN
// Event emitter
// Buffer & Stream
// Pipes
// etc....
