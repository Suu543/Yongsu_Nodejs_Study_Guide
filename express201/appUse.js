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
