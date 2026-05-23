const joi = require('joi')

const ReminderValidationForm = (req, res, next) => {
  // console.log(req.body)
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),

    email: joi.string().email().required(),

    message: joi.string().min(1).max(100).required(),

    priority: joi
      .string()
      .valid('normal', 'important', 'urgent')
      .optional()
  })
  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({message: 'Bad Request / Validation Errors',
    error: error.details[0].message})
  }
  next()
}

module.exports = ReminderValidationForm
