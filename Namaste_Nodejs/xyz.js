// Js functions scope
// function x(){
//     const a = 10;
//     function b() {
//         console.log("b");
//     }
// }
// console.log(a); -> Throw error

// require ("./path")
// All the code of the module is wrapped inside a function(IIFE)
// IIFE -> Immediately Invoked Function Expression

// Modules in Node.js work similarly to function scopes. When you require a file, Node.js wraps the code from that file inside a function.

// Immediately Invoked the code -> e function runs as soon as it is defined.
// Keep Variables and Functions Private -> By encapsulating the code within the IIFE, it prevents variables and functions from interfering with other parts of the code. This ensures that the code within the IIFE remains independent and private

// (function(exports, require, module, __filename , __dirname) {
//     All code of the module is wrapped inside a function
// })();

// require("./path") -> 5 step to execute
//    1. Resolving the Module
//          - Node.js first determines the path of the module. It checks whether thepath is a local file ( ./local ), a JSON file ( .json ), or a module from the node_modules directory, among other possibilities.
//    2. Loading the Module
//          - Once the path is resolved, Node.js loads the file content based on its type. The loading process varies depending on whether the file is JavaScript, JSON, or another type.
//    3. Compile (Wrapping Inside an IIFE)
//          - The module code is wrapped in an Immediately Invoked Function Expression IIFE. This wrapping helps encapsulate the module's scope, keeping variables and functions private to the module.
//    4. Code Evaluation and Module Exports
//          - After wrapping, Node.js evaluates the modules code. During this evaluation, module.exports is set to export the module's functionality or data. This step essentially makes the module's exports available to other files.
//    5. Chaching(very imp)
//          - Importance: Caching is crucial for performance. Node.js caches the result of the require() call so that the module is only loaded and executed once.

// Q1: How are variables and functions private in different modules?
// Ans - because of IIFE and the requirement (statement) wrapping code inside IFE.

// Q2: How do you get access to module.exports ? Where does this module come from?
// Ans -In Node.js, when your code is wrapped inside a function, this function has a parameter named
