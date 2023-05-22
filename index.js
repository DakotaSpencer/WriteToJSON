const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

let fileName = '/sampleAgentData.json'

// Read data from JSON file
// Read data from JSON file
function getData() {
    try {
      const data = fs.readFileSync(__dirname + fileName);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data from JSON file:', error);
      return [];
    }
  }
  
  // Write data to JSON file
  function writeData(data) {
    try {
      fs.writeFileSync(__dirname + fileName, JSON.stringify(data));
    } catch (error) {
      console.error('Error writing data to JSON file:', error);
    }
  }
  
  // Check if data.json exists, if not, create an empty file
  if (!fs.existsSync(__dirname + fileName)) {
    writeData([]);
  }
  
// GET endpoint to retrieve data from JSON file
app.get('/', (req, res) => {
  const data = getData();
  res.json(data);
});

// POST endpoint to add data to JSON file
app.post('/', (req, res) => {
  const data = getData();
  const newData = req.body;
  data.push(newData);
  writeData(data);
  res.json({ message: 'Data added successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
