const mongoose = require('mongoose');

const connectToMongodb = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
};

module.exports = { connectToMongodb };
