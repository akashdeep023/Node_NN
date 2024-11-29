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
