
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017'; // Replace with your actual MongoDB URL

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on connection failure
  }
};
// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB successfully");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

module.exports = connectToMongo;