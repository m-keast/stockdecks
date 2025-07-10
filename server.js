require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const app = express();
const port = 3000;
const fs = require('fs');
const csv = require('csv-parser');
const API_KEY = process.env.TWELVE_DATA_API_KEY;

app.use(express.static('client'));

app.get('/data', (req, res) => {
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

// A12Data API route
// Stock price API route
app.get('/api/price/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const API_KEY = process.env.TWELVE_DATA_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not found in environment' });
  }

  try {
    const response = await axios.get('https://api.twelvedata.com/price', {
      params: {
        symbol,
        apikey: API_KEY,
      },
    });

    // Respond with API data
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching stock price:', err.message);
    res.status(500).json({ error: 'Failed to fetch stock price' });
  }
});


// Route to return 1 random stock symbol
app.get('/api/random-symbol', async (req, res) => {
  const results = [];

  fs.createReadStream('nasdaq-listed-symbols.csv')
    .pipe(csv())
    .on('data', (data) => {
      const symbol = data[Object.keys(data)[0]]; // first column
      if (symbol) results.push(symbol);
    })
    .on('end', () => {
      if (results.length === 0) {
        return res.status(500).json({ error: 'No symbols found' });
      }
      const randomIndex = Math.floor(Math.random() * results.length);
      res.json({ symbol: results[randomIndex] });
    })
    .on('error', (err) => {
      console.error('CSV read error:', err);
      res.status(500).json({ error: 'Failed to read symbols' });
    });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


