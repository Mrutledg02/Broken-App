// const express = require('express');
// let axios = require('axios');
// var app = express();

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch {
//     next(err);
//   }
// });

// app.listen(3000);

// Issues fixed
const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get GitHub developers' information
app.post('/', async (req, res, next) => {
  try {
    const { developers } = req.body;
    const requests = developers.map(username =>
      axios.get(`https://api.github.com/users/${username}`)
    );
    const responses = await Promise.all(requests);
    const result = responses.map(response => ({
      name: response.data.name,
      bio: response.data.bio
    }));
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Custom error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: 'Internal Server Error' }); // Send JSON response for errors
});

// Export the app to be used in tests
module.exports = app;

// Start the server only if this is not a test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}