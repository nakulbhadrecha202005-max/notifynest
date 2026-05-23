const Router = require('express').Router()

const ReminderValidationForm = require('../Middlewares/ReminderValidationForm')
const SetReminder = require('../Controllers/SetReminder')
const Authproduct = require('../Middlewares/Authproduct')

Router.post('/AddReminders', Authproduct, ReminderValidationForm, SetReminder)

module.exports = Router
