# Unit Testing

- Automated testing is the practice of writing code to test our code.

- Automated tests help us deliver software with fewer bugs and of better quality. They also help us refactor our code with confidence.

- <b>Jest</b> is a new trending popular testing framework recommended by Facebook. It comes with everything you need to write automated tests.

- We have 3 types of automated test:

  - <b>Unit Tests</b>: Test a unit of an application without external resources (e.g. db)
  - <b>Integration Tests</b>: Test the application with external resources.
  - <b>Functional or end-to-end Test</b>: Test the application through ITS UI.

- <b>Tests should not be too general nor too specific</b>.

- If they're too general, they don't give you much confidence that your code works. If they're too specific, they become fragil and can break easily. As you write code, you have to spend extra unnecessary time to fix these broken tests.

- Mocking is replacing a real implementation of a function with a fake or mock function. <b>It allows us to isolate our application code from its external resources</b>

- Popular Jest matcher functions:

```javascript
// Equality
expect(...).toBe();
expect(...).toEqual();

// Truthiness
expect(...).toBeDefined();
expect(...).toBeNull();
expect(...).toBeTruthy();
expect(...).toBeFalsy();

// Numbers
expect(...).toBeGreaterThan();
expect(...).toBeGreaterThanOrEqual();
expect(...).toBeLessThan();
expect(...).toBeLessThanOrEqual();

// Strings
expect(...).toMatch(/regularExp/);

// Arrays
expect(...).toContain();

// Objects
expect(...).toBe(); // Check for the equality of object references
expect(...).toEqual(); // Check for the equality of properties
expect(...).toMatchObject();

// Exceptions
expect(() => { //someCode}).toThrow();
```

# Integration Tests

- Unit tests are easy to write, fast to execute and are ideal for testing function with minimal or zero dependency on external resoureces.

- The more you use mock function, the more you tests get coupled to the current implementation. If you change this implementation in the future, your tests will break. If you find yourself doing too much mocking, that's when you nned to replace your unit test with an integration test.

- With integration test, we test our application with a real database.<b> As a best practice, separate your test database from the development or production databases.</b>

- You should write each integration test as if it is the only test in the world. Start with a clean state (database). Populate the database only with the data required by the test. Nothing more, nothing less. Clean up after your test using the <b>afterEach</b> function.

- Run jest with <b>--coverage</b> to get a code coverage report.

```javascript
/*
1. No token is provided: 401 (Unauthorized)
2. Invalid token is provided: 400 (Bad Request)
3. Token in valid: 200 (Success)
*/

const { User } = require("../../models/user");
const { Genre } = require("../../models/genre");
const request = require("supertest");

describe("Auth Middleware", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await Genre.deleteMany({});
    await server.close();
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(re.status).toBe(200);
  });
});
```
