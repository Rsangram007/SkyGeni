const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = 4000;


app .use(cors())

// Helper function to read JSON files
function readJsonFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'data', filename), 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

// Route to fetch Customer Type data
app.get('/api/customer-type', async (req, res) => {
  try {
    const data = await readJsonFile('Customer Type.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to fetch ACV Range data
app.get('/api/acv-range', async (req, res) => {
  try {
    const data = await readJsonFile('ACV Range.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to fetch Account Industry data
app.get('/api/account-industry', async (req, res) => {
  try {
    const data = await readJsonFile('Account Industry.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to fetch Team data
app.get('/api/team', async (req, res) => {
  try {
    const data = await readJsonFile('Team.json');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});