const joi = require('joi')

const signup_validation = (req, res, next) => {
  const Schemas = joi.object({
    name: joi.string().min(3).max(250).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(250).required(),
    agreeTerms: joi.boolean().valid(true).required()
  })

  const { error } = Schemas.validate(req.body)
  if (error) {
    return res.status(400).json({message: 'Bad Request / Validation Errors',error})
  }
  next()
}

const login_validation = (req, res, next) => {
  const Schemas = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).max(25).required()
  })

  const { error } = Schemas.validate(req.body)
  if (error) {
    return res.status(400).json({message: 'Bad Request / Validation Errors',error})
  }
  next()
}

module.exports = { signup_validation, login_validation}
