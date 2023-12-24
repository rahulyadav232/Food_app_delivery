const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://rahyadav50:4fEE9lSf51x9H5bs@cluster1.jntkwpj.mongodb.net/';
const dbName = 'Fastfood';

const connectToMongoDB = async () => {
    try {
      const connection = await mongoose.connect(mongoURI + dbName, { useNewUrlParser: true });
      console.log('Connected to MongoDB');
      return connection.connection; // Use connection.connection instead of connection directly
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  };

  const fetchDataFromCollections = async () => {
    try {
      const connection = await connectToMongoDB();
  
      const foodCollection = connection.collection('food_items'); // Use collection() directly on the connection
      const foodData = await foodCollection.find({}).toArray();
  
      const categoryCollection = connection.collection('foodCategory');
      const categoryData = await categoryCollection.find({}).toArray();
      
  
      return { foodData, categoryData };
    } catch (error) {
      console.error('Error fetching data from collections:', error);
      throw error;
    }
  };

module.exports = fetchDataFromCollections;
