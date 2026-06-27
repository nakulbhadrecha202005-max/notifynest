const router = require('express')
const { signup_validation, login_validation } = require('../Middlewares/AuthValidation')
const { signup, login} = require('../Controllers/AuthController')

const Router = router()

const loginLimiter = require('../validationratelimit/loginLimiter')

Router.post('/login', login_validation , login)
Router.post('/signup', signup_validation , signup)

module.exports = Router
