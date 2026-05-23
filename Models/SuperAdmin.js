const mongoose = require('mongoose')

const SuperAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  collection: 'superadmins'
})

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema)
