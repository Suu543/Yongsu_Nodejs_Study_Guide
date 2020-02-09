const express = require("express");
const app = express();

/*
App object has a few methods:

HTTP Verbs! REST Verbs!
= CRUD Application Correspondence
1. get - READ: Default For All Browsers is GET
2. post - CREATE
3. put - UPDATE
4. delete - DELETE
5. all - I will accept any method...

# Takes 2 args:
1. Path
2. Callback to run if an HTTP Request that matches THIS verb is made to the path in #1

app.all('/', (req, res) => {
    console.log(req)
    res.send(`<h1>Welcome to the homepage!</h1>`)
})
*/

app.get("/", (req, res) => {
  console.log(req);
  res.send(`<h1>Welcome to the home GET page!`);
});
app.post("/", (req, res) => {
  res.send(`<h1>Welcome to the home POST page!`);
});
app.delete("/", (req, res) => {});
app.put("/", (req, res) => {});

app.listen(3000);
console.log("The server is listening on port 3000...");
