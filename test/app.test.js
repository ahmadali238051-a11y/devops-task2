const test = require("node:test");
const assert = require("node:assert");

test("basic application test", () => {
  const message = "Node.js CI/CD Demo App is running";

  assert.strictEqual(
    message,
    "Node.js CI/CD Demo App is running"
  );
});
