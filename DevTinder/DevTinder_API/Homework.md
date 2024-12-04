# **Class Notes & Home Work**

-   Create a repository (Project)
    -   Creating DevTinder_API
-   Initialize the repository

    -   Use command

    ```bash
    npm init
    ```

-   node_modules, package.json, package-lock.json
    -   Node_Modules - All npm modules inside node_modules (node.js, express.js, nodemon)
    -   Package.json - A folder containing a program described by a package.json file. (name, version, author, dependencies)
    -   Package-lock.json - It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.
-   Install express

    -   Use command

    ```bash
    npm i express
    ```

-   Create a server

    ```js
    const express = require("express");
    const app = express();

    // Write request handler for "/test"
    app.use("/test", (req, res) => {
    	res.send("Hello from the test route");
    });

    // Listen to port 7777
    app.listen(7777, () => {
    	console.log("Server is successfully listening on 7777 port...");
    });
    ```

-   Install nodemon and update scripts inside package. json

    -   Use command for nodemon installation

    ```bash
    npm i -g nodemon
    ```

    -   Update script inside package.json

    ```json
    "scripts": {
    	"start": "node src/app.js",
    	"dev": "nodemon src/app.js"
    },
    ```

-   What is the use of "-g" while npm install
    -   Enables the npm CLI to install the package globally (Local machine).
-   What are dependencies
    -   Dependencies : Packages required by your application in production.
    -   DevDependencies : Packages that are only needed for local.
-   Difference between caret(^) and tilde(~)
    -   major.minor.patch : x.y.z
    -   caret(^) - Accept new minor and patch versions. `^1.2.3`is equivalent to >= `1.2.3` < `2.0.0`
    -   tilde(~) - Accept new patch versions. `~1.2.3` is equivalent to >= `1.2.3` < `1.3.0`
-   How to close the server

    -   Use command

    ```bash
    ctrl + C
    ```

-   Order of the routes matters a lot.

    -   Browser - `/` route, Responce - `Hello from the server`
    -   Browser - `/hello` route, Responce - `Hello from the server`
    -   Browser - `/test` route, Responce - `Hello from the server`
    -   Browser - `/xyz` route, Responce - `Hello from the server`
    -   _`/`, `/hello`, `/test` & `/xyz` routes match with 1st `/` route handler_

    ```js
    app.use("/", (req, res) => {
    	res.send("Hello from the server");
    });
    app.use("/hello", (req, res) => {
    	res.send("Hello from the hello route");
    });
    app.use("/test", (req, res) => {
    	res.send("Hello from the test route");
    });
    ```

    -   Browser - `/` route, Responce - `Hello from the server`
    -   Browser - `/hello` route, Responce - `Hello from the hello route`
    -   Browser - `/test` route, Responce - `Hello from the test route`
    -   Browser - `/xyz` route, Responce - `Hello from the server`
    -   _`/`, `/hello` & `/test` routes match with own route handler and `/xyz` route match with `/` route handler_

    ```js
    app.use("/hello", (req, res) => {
    	res.send("Hello from the hello route");
    });
    app.use("/test", (req, res) => {
    	res.send("Hello from the test route");
    });
    app.use("/", (req, res) => {
    	res.send("Hello from the server");
    });
    ```

-   Write logic to handle GET, POST, PATCH, DELETE APIs calls and test them on POstman
    ```js
    // This will only handle GET to /user
    app.get("/user", (req, res) => {
    	res.send({ firstName: "Akash", lastName: "Deep" });
    });
    // This will only handle POST to /user
    app.post("/user", (req, res) => {
    	res.send("User data successfully saved to the database");
    });
    // This will only handle PATCH to /user
    app.patch("/user", (req, res) => {
    	res.send("Updated successfully");
    });
    // This will only handle DELETE to /user
    app.delete("/user", (req, res) => {
    	res.send("Deleted successfully");
    });
    ```
-   Explore routing and use of `?`, `+` , `()`, `*` in the routes

    ```js
    // Explore Advance routing
    // ? before letter -> exist ya not exist
    // ab?c -> abc, ab
    app.get("/ab?c", (req, res) => {
    	res.send("Hello world!");
    });

    // ? before (string) -> exist ya not exist
    // a(bc)?d -> abcd, ad
    app.get("/a(bc)?d", (req, res) => {
    	res.send("Hello world!");
    });

    // + before latter -> one time ya many times
    // ab+c -> abc, abbc, abbbc, abbbbc, etc.
    app.get("/ab+c", (req, res) => {
    	res.send("Hello world!");
    });

    // + before (string) -> string one time ya many times
    // a(bc)+d -> abcd, abcbcd, abcbcbcd, etc.
    app.get("/a(bc)+d", (req, res) => {
    	res.send("Hello world!");
    });

    // * -> replace "*" to any other string
    // ab*c -> abc, abxc, abxyzc, abanythingc, etc.
    app.get("/ab*c", (req, res) => {
    	res.send("Hello world!");
    });
    ```

-   Use of regex in routes `/a/` , `/.*fly$/`

    ```js
    // anywhere "a" exist in routing - handle
    // Ex:- apple, a, man, leader, etc.
    app.get(/a/, (req, res) => {
    	res.send("Hello world!");
    });

    // end of "fly" in routing - handle
    // Ex:- fly, dragonfly, butterfly, afly,etc.
    app.get(/.*fly$/, (req, res) => {
    	res.send("Hello world!");
    });
    ```

-   Reading the query, params in the routes

    ```js
    // query
    // Ex:- http://localhost:7777/user?name=akash
    app.get("/user", (req, res) => {
    	console.log(req.query); // { name: 'akash' }
    	res.send("Hello world!");
    });

    // params
    // Ex:- http://localhost:7777/user/101
    app.get("/user/:userId", (req, res) => {
    	console.log(req.params); // { userId: '101' }
    	res.send("Hello world!");
    });
    ```

-   Reading the dynamic routes

    ```js
    // dynamic routes
    // Ex:- http://localhost:7777/user/101/akash
    app.get("/user/:id/:name", (req, res) => {
    	console.log(req.params); // { id: '101', name: 'akash' }
    	res.send("Hello world!");
    });
    ```

-   Use next() function
    -   Use `next()` function to call next route handler
-   next() function and errors along with res.send()

    -   When the `next()` function is used before or after the `res.send()` function -> got a error

-   Multiple Route Handlers - Play with the code
    ```js
    // Multiple routes handlers
    app.use(
    	"/user",
    	(req, res, next) => {
    		console.log("Handling the route user!");
    		// next();
    		// res.send("Response!");
    		next();
    	},
    	(req, res, next) => {
    		console.log("Handling the route user 2!");
    		// res.send("2nd Response!");
    		next();
    	},
    	(req, res, next) => {
    		console.log("Handling the route user 3!");
    		// res.send("3nd Response!");
    		next();
    	},
    	(req, res, next) => {
    		console.log("Handling the route user 4!");
    		// res.send("4nd Response!");
    		next();
    	},
    	(req, res, next) => {
    		console.log("Handling the route user 5!");
    		res.send("5nd Response!");
    	}
    );
    ```
-   app.use("/route", rH, [rH2, rH3], rH4, rh5);

    ```js
    // Same behaviour - route-handler rapping in tha array
    // rH, rH2, rH3, rH4, rH5 -> route-handler
    app.use("/route", [rH, rH2, rH3, rH4, rh5]);
    // ya
    app.use("/route", rH, [rH2, rH3], rH4, rh5);
    // ya
    app.use("/route", [rH, rH2, rH3], rH4, rh5);
    ```
