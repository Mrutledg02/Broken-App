### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Callbacks: Functions passed as arguments to be executed after a task is completed. However, they can lead to "callback hell" when nested too deeply.

Promises: Objects representing the eventual completion or failure of an asynchronous operation. They help avoid callback hell by chaining .then() and .catch().

Async/Await: Syntactic sugar over promises, making asynchronous code look like synchronous code. It simplifies writing and understanding complex asynchronous code.

- What is a Promise?

A Promise is an object representing the eventual outcome of an asynchronous operation. It can be in one of three states:

Pending: The operation is ongoing.

Fulfilled: The operation completed successfully.

Rejected: The operation failed.

Promises allow you to chain asynchronous operations using .then() for success and .catch() for errors.

- What are the differences between an async function and a regular function?

Async Function: Uses the async keyword. Always returns a Promise, even if no await keyword is present. And, allows the use of await within it to pause execution until the Promise is resolved or rejected.

Regular Function: Executes synchronously and returns the result immediately, without the ability to pause execution.

- What is the difference between Node.js and Express.js?.

Node.js: A JavaScript runtime built on Chrome's V8 engine, allowing you to run JavaScript on the server-side. It provides APIs to interact with the file system, network, and other low-level operations.

Express.js: A lightweight web application framework built on top of Node.js, simplifying tasks like routing, middleware, and handling HTTP requests and responses.

- What is the error-first callback pattern?

A pattern where the first argument of a callback function is an error object (or null if there’s no error), followed by the result data. This pattern allows consistent error handling across asynchronous operations.

- What is middleware?

Middleware refers to functions that execute in the middle of the request-response cycle in an Express application. Middleware functions have access to the request object (req), response object (res), and the next middleware function in the stack (next). They are used for tasks like logging, authentication, parsing request bodies, and more.

- What does the `next` function do?

The next function is used in Express middleware to pass control to the next middleware function in the stack. If not called, the request-response cycle will be left hanging, and the request will not be completed.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

Performance: The code waits for each request to complete before starting the next one. This leads to unnecessary delays. Instead, you can execute all requests in parallel using Promise.all.

Structure: The names elie, joel, and matt are hardcoded and may not be descriptive. Consider renaming to user1, user2, and user3, or use a loop if the users are dynamic.

Ordering: The returned array has matt and joel in the wrong order compared to the original API calls.

Improved code: 

```js
async function getUsers() {
  const users = await Promise.all([
    $.getJSON('https://api.github.com/users/elie'),
    $.getJSON('https://api.github.com/users/joelburton'),
    $.getJSON('https://api.github.com/users/mmmaaatttttt')
  ]);

  return users; // or return users in the desired order
}
```