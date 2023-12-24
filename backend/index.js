const express = require('express');
const fetchDataFromCollections = require('./db'); // Assuming you have a module exporting data fetching logic

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Assuming fetchDataFromCollections returns a promise
fetchDataFromCollections()
  .then(({ foodData, categoryData }) => {
    global.foodData = foodData;
    global.foodCategory = categoryData;
    console.log('Fetched data from collections:', foodData, categoryData);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
