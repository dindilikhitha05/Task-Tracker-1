// Purpose: Defines the MongoDB schema for tasks.
const mongoose = require('mongoose');

/**
 * Describes task documents stored in MongoDB.
 * @returns {mongoose.Schema} The configured task schema.
 */
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose model used by task controllers.
 * @returns {mongoose.Model} The Task model.
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
