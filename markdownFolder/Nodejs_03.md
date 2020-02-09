# Building RESTful APIs with Express Recap

### REST

- REST defines a set of conventions for creating HTTP services:

  - POST: To create a resource
  - PUT: To update it
  - GET: To read it
  - DELETE: To delete it

- Express is simple, minimalistic and lightweight framework for building web servers.

```javascript
// Build a Web Server
const express = require("express");
const app = express();

// Creating a Course
app.post("/api/courses", (req, res) => {
  // Create the course and return the course object
  res.send(course);
});

// Getting All the courses
app.get("/api/courses", (req, res) => {
  // To read query string parameters (?sortBy=name)
  const sortBy = req.query.sortBy;

  // Return the courses
  res.send(courses);
});

// Getting a single course
app.get("/api/courses/:id", (req, res) => {
  const courseId = req.params.id;

  // Lookup the course
  // If not found, return 404
  res.status(404).send("Course Not Found.");

  // Else, return the course object
  res.send(course);
});

// Updating a course
app.put("/api/courses/:id", (req, res) => {
  // If course not found, return 404, otherwise delete it
  // and return the deleted object
});

// Listen on port 3000
app.listen(3000, () => console.log("Listening..."));
```

- We use <b>Nodemon</b> to watch for changes in files and automatically restart the node process.
- We can use environment variables to store various settings for an application. To read an environment variable, we use <b>process.env</b>

```javascript
const port = process.env.PORT || 3000;
app.listen(port);
```

- You should never trust data sent by client. Always validate! Use <b>Joi</b> package to perform input validation.

# Express: Advanced Topics

- <b>A middleware function</b> is a function that takes a request object and either terminates the request/response cycle or passes control to another middleware function (next()).

- Express has a few built-in middleware functions:

  - <b>json()</b>: to parse the body of requests with a JSON payload
  - <b>urlencoded</b>: to parse the body of requests with URL-encoded payload
  - <b>static()</b>: to serve static files

- You can create custom middleware for cross-cutting concerns, such as <b>logging, authentication, etc</b>

```javascript
// Custom middleware (applied on all routes)
app.use(function (req, res, next)) {
    // ...
    next();
}

// Custom middleware (applied on routes starting with /api/admin)
app.use('/api/admin', function(req, res, next) {
    // ...
    next();
})
```

- We can detect the environment in which our Node application is running (development, production, etc) using **process.env.NODE_ENV** and **app.get("env")**

- The <b>config</b>package gives us an elegant way to store configuration settings for our applications.
- We can use the <b>debug</b> package to add debugging information to an application. Prefer this approach to console.log() statements.
- To return HTML markup to the client, use a templating engine. There are various templating engines available out there. Pug, EJS, and Mustache are the most popular ones.
