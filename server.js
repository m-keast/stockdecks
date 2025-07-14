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


// GET STOCK DATA FROM CSV Route
app.get('/api/random-stock', async (req, res) => {
  const results = [];

  fs.createReadStream('ticker_data.csv')
    .pipe(csv())
    .on('data', (data) => {
        const symbol = data[Object.keys(data)[0]];
        const stockname = data[Object.keys(data)[1]];
        const sector = data[Object.keys(data)[9]];
        const description = data[Object.keys(data)[11]];
      if (symbol && stockname && sector && description) results.push({ symbol, stockname, sector, description });
    })
    .on('end', () => {
      if (results.length === 0) {
        return res.status(500).json({ error: 'No symbols found' });
      }
      const randomIndex = Math.floor(Math.random() * results.length);
      res.json({ stockdata: results[randomIndex] });
    })
    .on('error', (err) => {
      console.error('CSV read error:', err);
      res.status(500).json({ error: 'Failed to read symbols' });
    });
});

app.get('/api/userdeck', async (req, res) => {
  try {
    const data = await getUserDeck();
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No user deck found' });
    }
    res.json(data);
  } catch (err) {
    console.error('Error fetching user deck:', err);
    res.status(500).json({ error: 'Failed to fetch user deck' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


