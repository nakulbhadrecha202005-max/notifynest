const mongoose = require('mongoose')
const schemas = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  agreeTerms: {
    type: Boolean,
    required: true
  }
// imagePath:
})

const UserModels = mongoose.model('Notificationwebsiteusers', schemas)
module.exports = UserModels
