# Handling and Logging Errors

- Our applications don't run in an ideal world. Unexpected errors can happen as a result of bugs in our code or issues in the running environment. For example, our MongoDB server may shut down, or a remote HTTP service we call may go down.

- As a good developer, <b>you should count for these unexpected errors, log them and return a proper error to the client</b>

* Use the Express error middleware to catch any <b>unhandled exceptions in the "request processing pipeline"</b>

- <b>Register the error middleware after all the existing routes:</b>

```javascript
app.use(function(err, req, res, next) {
  // Log the exception and return a friendly error to the client.
  res.status(500).send("Something Failed");
});

// To pass control to the error middleware, wrap your route handler code in a try/catch block and call next();

try {
  const genres = await Genre.find();
  //...
} catch (ex) {
  next(ex);
}
```

- <b>Adding a try/catch block to every route handler is repetitive and time consuming</b>.

- Use <b>express-async-errors</b> module. This module will monkey-patch your route handlers at runtime. It'll wrap your code within a try/catch block and pass unhandled errors to your error middleware.

- To log errors use <b>winston</b>

- winston can lon errors in multiple transports. A transport is where your log is stored.

- The core transport that come with Winston are <b>Console, File and Http</b>. There are also 3rd-party transports for storing logs in <b>MongoDB, CouchDB, Redis and Loggly</b>.

- The error middleware in Express <b>only catches exceptions in the request processing pipeline.</b> Any errors happening during the application startup (e.g. connecting to MongoDB) will be invisible to Express.

- Use <b>process.on('uncaughtException')</b> to catch unhandled exceptions, and <b>process.on('unhandledRejection')</b> to catch rejected promises.

- As a best practice, in the event handlers you pass to <b>process.on()</b>, you should log the exception and exit the process, because your process may be in an unclean state and it may result in more issues in the future. It's better to restart the process in a clean state. In production, you can use a <b>process manager</b> to automatically restart a Node process.

```javascript
const { logger } = require("../utils/logger");
require("express-async-errors");

module.exports = function() {
  process.on("uncaughtException", ex => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION");
    logger.error(ex);
    process.exit(1);
  });

  process.on("unhandledRejection", ex => {
    console.log("WE GOT AN UNHANDLED REJECTION");
    logger.error(ex);
    process.exit(1);
  });
};
```
