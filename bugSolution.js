const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {
  try {
    await someAsyncOperation();
    res.send('Hello!');
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => console.log('Server listening on port 3000'));

async function someAsyncOperation() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.5) {
        reject(new Error('Something went wrong'));
      } else {
        resolve();
      }
    }, 1000);
  });
}