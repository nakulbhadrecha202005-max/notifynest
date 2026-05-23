const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  message: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },

  priority: {
    type: String,
    enum: ['normal', 'important', 'urgent'],
    default: 'normal'
  },

  isActive: {
    type: Boolean,
    default: true
  },
  sentCount: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true, // adds createdAt & updatedAt
  }
)

module.exports = mongoose.model('Reminder', reminderSchema)
