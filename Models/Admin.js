const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    default: 'admin'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('admins', adminSchema)
