const jwt = require('jsonwebtoken')

const Authproduct = (req, res, next) => {
  try {
    const auth = req.headers.authorization

    if (!auth) {
      return res.status(403).json({
        message: 'UnAuthorised access, JWT Token required.'
      })
    }
    const token = auth.split(' ')[1]
    // console.log(token)
    if (!token) {
      return res.status(403).json({
        message: 'Token missing'
      })
    }
    const decoded = jwt.verify(token, 'nakul1', { expiresIn: '100y' })
    // console.log(decoded)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({
      message: 'Unauthorised access, JWT token is expired or wrong'
    })
  }
}

module.exports = Authproduct
