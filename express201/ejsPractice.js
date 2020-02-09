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
    msg2: "Success!",
    // HTML came from teh DB and we want to drop it in the template
  });
});
