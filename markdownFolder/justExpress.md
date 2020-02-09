# Node-Server

- HTTP Message:

  - 1. start-line
  - 2. header
  - 3. body

- writeHead takes 2 args:
  - 1. status code
  - 2. object for the mime-type

```javascript
/ http is native to Node.js we just have to ask for it...
const http = require("http");

// fs = file system module! fs is built into Node. See above
// fs gives node access THIS computer file system.
const fs = require("fs");

// the http module has a createServer method
// takes 1 arg:
// 1. callback, callback, has 2 args: req, res
const server = http.createServer((req, res) => {
  console.log(`A request was made to: ${req.url}`);
  if (req.url === "/") {
    // the user wants the home page! we know, the req object has / in the url property
    // console.log(req)
    // res = our way of responding to the requester

    // http message
    // 1. start-line - CHECK
    // 2. header
    // 3. body

    // writeHead takes 2 args:
    // 1. status code
    // 2. object for the mime-type
    res.writeHead(200, { "content-type": "text/html" });
    // res.write('');
    const homePageHTML = fs.readFileSync("node.html");
    res.write(homePageHTML);
    res.end();
  } else if (req.url === "/node.png") {
    res.writeHead(200, { "content-type": "image/png" });
    const image = fs.readFileSync("node.png");
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    const css = fs.readFileSync("styles.css");
    res.write(css);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h4>Sorry, this isn't the page you're looking for!</h4>`);
    res.end();
  }
});

// createServer returns an object with a listen method
// listen takes 1 arg:
// 1. port to listen for http traffic on
server.listen(3000);
```

# Just-Express 101

- Node.js is the language
- Express is Node, a Node Module

```javascript
const path = require("path");

// express is a 3rd party module
const express = require("express");
// An "app" is the express function (createApplication inside the Express module)
// invoked and is an Express application
const app = express();

// Serve up static files!! Only 1 line... take that node.js
app.use(express.static("public"));

// all is a method, and it takes 2 args:
// 1. route
// 2. callback to run if the route is requested
app.all("/", (req, res) => {
  // Express handles the basic headers (status code, mime-type)! Awesome!
  // read in Node.html
  console.log(path.join(__dirname + "/node.html"));
  console.log(path.join(__dirname + "/node.html"));
  // res.send(`<h1>This is the home page!</h1>`);

  // Express handles the end! Awesome!
});
```

## HTTP Verbs! REST Verbs!

- HTTP Verbs! REST Verbs!
  = CRUD Application Correspondence

1. get - READ: Default For All Browsers is GET
2. post - CREATE
3. put - UPDATE
4. delete - DELETE
5. all - I will accept any method...

- Takes 2 args:

1. Path
2. Callback to run if an HTTP Request that matches THIS verb is made to the path in #1
3.

```javascript
app.all("/", (req, res) => {
  console.log(req);
  res.send(`<h1>Welcome to the homepage!</h1>`);
});

app.get("/", (req, res) => {
  console.log(req);
  res.send(`<h1>Welcome to the home GET page!`);
});

app.post("/", (req, res) => {
  res.send(`<h1>Welcome to the home POST page!`);
});

app.delete("/", (req, res) => {});

app.put("/", (req, res) => {});
```

# Just-Express 201

```javascript
const express = require("express");
const app = express();
const helmet = require("helmet");

// https://expressjs.com/ko/advanced/best-practice-security.html#use-helmet
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. static
// 2. json
// 3. urlencoded

app.post("/ajax", (req, res) => {
  console.log(req.body);
  res.json(["Test", 1, 2, 3, 4]);
});

app.listen(3000);
```

```javascript
const express = require("express");
const app = express();

// Express = 2 things
// 1. Router
// 2. Middleware that comprises a webframework

// Req ---- Middleware ----> Res
// Middleware function is ANY function that has access to the req, res, next object!

// Req ---- Middleware ----> Res
// 1. Request Come in
// 2. We need to validate the user, sometimes,
// 3. We need to store some things in the DB
// 4. If there is data from the user we need to parse it and store it.
// 5. Res

function validateUser(req, res, next) {
  // Get info out of the req object
  // do some stuff with the DB
  res.locals.validated = true;
  console.log("Validated Ran!");
  next();
}

// This will run validateUser on ALL paths, all methods!
app.use(validateUser);

// This will run validateUser on /admin, all methods!
app.use("/admin", validateUser);

// This will run validateUser on /, only get methods! And, by the way, it looks like this...
app.get("/", validateUser);

app.get("/", (req, res, next) => {
  res.send("<h1>Main Page</h1>");
  console.log(res.locals.validated);
});

app.get("/admin", (req, res, next) => {
  res.send("<h1>Admin Page</h1>");
  console.log(res.locals.validated);
});

app.listen(3000);
```

```javascript
const path = require("path");
const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet());

// Serve up static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 4. We pass that res.render 2 things:
// - the file we want to use
// - the data we want to send to that file

// 5. Express uses the node module for our specified view engine and parses the file.
// - that means, it takes HTML/JS/CSS and combines it with whatever "node" there is in the file

// 6. The final result of this process is a compiled product of the things the browser can read.
// HTML ,JS, CSS

function validateUser(req, res, next) {
  // ...validated logic
  res.locals.validated = true;
  next();
}

app.use(validateUser);

app.get("/about", (req, res, next) => {
  res.render("about", {});
});

app.get("/", (req, res, next) => {
  // the data, in the 2nd arg, is going to be appened to res.locals
  res.render("index", {
    msg: "Failure!",
    msg2: "Success!"
    // HTML came from teh DB and we want to drop it in the template
  });
});
```

# Semi-Review

- Networking - HTTP and TCP/UDP

  - stateless
  - connectionless
  - flexible
  - HTTP Message
    - Start Line
      - req: GET /blog http/1.1
      - res: http/1.1 200 ok
    - Headers
      - {key: values}
        - content-type: text/html
        - content-type: application/json
        - Cache-Control: public, max-age=0
        - Date: Fri, 24 Aug 2019, 15:23:58 GMT
    - Blank Line
    - body
      - STUFF - HTML, 4K video (binary), image...

- Node Server

  - Write Headers
  - Write Body
    - Used the fs module
  - close connection
  - server.listen
    - PORT
  - req, res

- Express Version
  - Express is Nodejs
  - app === express() === createApplication()
  - server.listen ---> app.listen
  - router
    - app.get, app.post, app.put, app.all, app.delete, etx
  - serverd up static files, with express.static() middleware

* 201
  - Middleware = is any function that has access to req, res, and next - Networking on the outside, node/express development on the insdie - app.use, anytime you see a callback/function (req, res, next) => - next() is the way to move a piece of middleware foward - express.json() --- body parser - express.urlencoded() --- body parser - helmet() -- 3rd party module
    Reuqest - req.ip - contains requestes ip - req.path - contains the requested path - req.body - parsed data
    Response - res.send(.end()) - send text/html - res.sendFile - send a File! - res.locals - is available through the res - res.json - sends json back as application/json

# Just-Express 301

- app.params() - takes 2 args:
  - 1. param to look for in the route
  - 2. the callback to run (with the usuals)

```javascript
app.param("id", (req, res, next, id) => {
  console.log("Params called:", id);
  // if id has something to do with stories...
  // if id has sosmething to do with blog...
  next();
});

app.get("/story/:storyId/:link", (req, res, next) => {
  // the req.params object always exists
  // it will have a property for each wildward in the route
  res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`);
  // res.send('<h1>Story 1</h1>')
});
```

- res.download - takes 3 args:

  - 1. path
  - 2. what you want to call the file when the user gets it (optional)
  - 3. callback (which accpets an error)

```javascript
const date = new Date();
res.download(
  path.join(__dirname, "userStatements/BankStatementChequing.png"),
  "jimsStatement.png",
  err => {
    console.log(err);
  }
);
```

- cookieParse

```javascript
app.post("/process_login", (req, res, next) => {
  // req.body is made by urlencoded, which parses the http message for sent data!
  const password = req.body.password;
  const username = req.body.username;
  // check the db to see if user credentials are valid
  // if they are valid
  // - save their username in a cookie
  // - is send them to the welcome page

  if (password === "x") {
    // res.cookie takes 2 args:
    // 1. name of the cookie
    // 2. value to set it to
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    // The "?" is a special character in a URL
    res.redirect("/login?msg=fail&test=hello");
  }
});

app.get("/logout", (req, res, next) => {
  // res.clearCookie takes 1 arg:
  // 1. Cookie to clear (by name)
  res.clearCookie("username");
  res.redirect("/login");
});
```

```javascript
const path = require("path");

const express = require("express");
const app = express();

const cookieParse = require("cookie-parser");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParse());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = `Sorry. This username and password combinatino does not exist.`;
  } else {
    res.locals.msg = ``;
  }

  // Send me on to the next piece of middleware!
  next();
});

app.get("/", (req, res, next) => {
  res.send("Sanity Check");
});

app.get("/login", (req, res, next) => {
  // the res object has a query property in Express.
  // req.query is an object, with a property of every key in the query string.
  // The query string is where you put insecure data.
  // console.log(res.query)
  const msg = req.query.msg;
  if (req.query.fail) {
    // run some other function...
  }
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  // req.body is made by urlencoded, which parses the http message for sent data!
  const password = req.body.password;
  const username = req.body.username;
  // check the db to see if user credentials are valid
  // if they are valid
  // - save their username in a cookie
  // - is send them to the welcome page

  if (password === "x") {
    // res.cookie takes 2 args:
    // 1. name of the cookie
    // 2. value to set it to
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    // The "?" is a special character in a URL
    res.redirect("/login?msg=fail&test=hello");
  }
});

app.get("/welcome", (req, res, next) => {
  // req.cookies object will have a property for every named cookie
  // that has been sent
  res.render("welcome", {
    username: req.cookies.username
  });
});

// app.param() - takes 2 args:
// 1. param to look for in the route
// 2. the callback to run (with the usuals)
app.param("id", (req, res, next, id) => {
  console.log("Params called:", id);
  // if id has something to do with stories...
  // if id has sosmething to do with blog...
  next();
});

// app.get('/user/:uid', ...)
// app.get('/user/admin/:uid', ...)
// app.get('/user/profile/:uid', ...)

// in a route, anytime something has a : in front it is a wildcard!
// wildecard will match anything in that slot
app.get("/story/:id", (req, res, next) => {
  // the req.params object always exists
  // it will have a property for each wildcard in the route
  req.send(`<h1>Story ${req.params.storyId}</h1>`);
});

// THIS WILL NEVER RUN, because it matches above (without next())
// app.get('/story/:blogId',(req, res, next)=>{
//     // the req.params object always exists
//     // it will have a property for each wildcard in the route
//     res.send(`<h1>Story ${req.params.storyId}</h1>`)
//     // res.send('<h1>Story 1</h1>')
// })

app.get("/story/:storyId/:link", (req, res, next) => {
  // the req.params object always exists
  // it will have a property for each wildward in the route
  res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`);
  // res.send('<h1>Story 1</h1>')
});

// app.get('/story/1',(req, res, next)=>{
//     res.send('<h1>Story 1</h1>')
// })

// app.get('/story/2',(req, res, next)=>{
//     res.send('<h1>Story 2</h1>')
// })

// app.get('/story/3',(req, res, next)=>{
//     res.send('<h1>Story 3</h1>')
// })

app.get("/statement", (req, res, next) => {
  // hand off the file to the right user
  // res.download - takes 3 args:
  // 1. path
  // 2. what you want to call the file when the user gets it (optional)
  // 3. callback (which accpets an error)

  const date = new Date();
  res.download(
    path.join(__dirname, "userStatements/BankStatementChequing.png"),
    "jimsStatement.png",
    err => {
      console.log(err);
    }
  );

  // sendFile will load in the browser!
  // res.sendFile(path.join(__dirname, 'userStatements/BankStatementChequing.png'),'jimsStatement.png')
  // res.attachment takes 1 arg:
  // 1. filename.
  // all attachment does it set up the headers. It wont actually send the file.
  // res.attachment(path.join(__dirname, 'userStatements/BankStatementChequing.png'))
});

app.get("/logout", (req, res, next) => {
  // res.clearCookie takes 1 arg:
  // 1. Cookie to clear (by name)
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000);
console.log("Server Listening on port 3000!");
```

```javascript
app.get("/login", (req, res, next) => {
  // the res object has a query property in Express.
  // req.query is an object, with a property of every key in the query string.
  // The query string is where you put insecure data.
  // console.log(res.query)
  const msg = req.query.msg;
  if (req.query.fail) {
    // run some other function...
  }
  res.render("login");
});

app.post("/process_login", (req, res, next) => {
  // req.body is made by urlencoded, which parses the http message for sent data!
  const password = req.body.password;
  const username = req.body.username;
  // check the db to see if user credentials are valid
  // if they are valid
  // - save their username in a cookie
  // - is send them to the welcome page

  if (password === "x") {
    // res.cookie takes 2 args:
    // 1. name of the cookie
    // 2. value to set it to
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    // The "?" is a special character in a URL
    res.redirect("/login?msg=fail&test=hello");
  }
});
```
