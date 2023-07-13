
const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URLs provided.' });
  }

  const urls = Array.isArray(url) ? url : [url];
  const result = [];

  try {
    for (const url of urls) {
      const response = await axios.get(url);
      const number = response.data.number;
      result.push(number);
    }

    res.json({ numbers: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve numbers from the provided URLs.' });
  }
});

app.listen(port, () => {
  console.log(`Number Management Microservice listening at http://localhost:${port}`);
});
