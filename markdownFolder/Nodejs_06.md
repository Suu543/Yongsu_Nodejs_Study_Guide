# Authentication and Authorization

#### Authentication

- Authentication is the process of determining if the user is who he/she claims to be. It involves validating their email/password. (로그인)

#### Authorization

- Authorization is the process of determining if the user has permission to perform a given operation. (로그인 후 접근 권한)

- To hash passwords, use <b>bcrypt</b>:

```javascript
// Hashing Passwords
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash("1234", salt);

// Validating Passwords
const isValid = await bcrypt.compare("1234", hashed);
```

- A<b>JSON Web Token (JWT)</b>is a JSON object encoded as a long string. We use them to identify users. It's similar to <b> a passport or driver's license </b>. It includes a few public properties about a user in its payload. These properties cannot be tampered(변조된) because doing so requires re-generating the digital signature.

- When the user logs in, we generate a JWT on the server and return it to the client. We store this token on the client and send it to the server every time we need to call an API endpoint that is only accessible to autenticated users.

- To generate JSON Web Tokens is an Express app use <b>jsonwebtoken</b> package.

```javascript
// Generating a JWT
const jwt = require("jsonwebtoken");
const token = jwt.sign({ _id: user._id }, "privateKey");
```

- <b>Never store private keys and other secrets in your codebase</b>. Store them in environment variables. Use the <b>config or dotenv</b> package to read application settings stored in environment variables.

- When appropriate, encapsulate logic in Mongoose models:

```javascript
// Adding a method to Mongoose model
userSchema.methods.generateAuthToken = function() {};

const token = user.generateAuthToken();
```

- To implement authorization using a middleware function.
- Return 401 error (Unauthorized) if the client doesn't send a valid token.
- Return 403 error (forbidden) if the user provided a valid token but is not allowed to perform the given operation.

- You don't need to implement logging out on the server. Implement it on the client by simply removing the JWT from the client.

- Do not store a JWT in plain text in a database. This is similar to storing users' passports or driver license in a room. Anyone who has access to that room can steal these passports. Store JWTs on the client. If you have a strong reason for storing them on the server, make sure to encrypt them before storing them in a database.

```javascript
// Frontend 단에서
// login
localstorage.setItem(tokenKey, jwt);

// getItem
localstorage.getItem(tokenKey);

// logout
localstorage.removeItem(tokenkey);
```
