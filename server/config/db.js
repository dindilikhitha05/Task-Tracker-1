// Purpose: Centralizes the MongoDB connection configuration for the server.
const mongoose = require('mongoose');

/**
 * Connects the server to MongoDB using the configured connection string.
 * @returns {Promise<void>} Resolves once the connection is established.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-tracker';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
