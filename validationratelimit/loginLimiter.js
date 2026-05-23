const rateLimit = require('express-rate-limit')
const UAParser = require('ua-parser-js')
const { ipKeyGenerator } = require('express-rate-limit')
const express = require('express')
const app = express()
app.set('trust proxy', 1)

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 5 login attempts per windowMs
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
    const parser = new UAParser(req.headers['user-agent'] || '')

    const os = parser.getOS().name || 'unknown'
    const browser = parser.getBrowser().name || 'unknown'

    const ip = ipKeyGenerator(req.ip)

    req.deviceInfo = {
      ip: req.ip,
      os,
    browser}

    return `${ip}-${os}-${browser}`
  },

  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many login attempts, please try again later after 15 minutes.',
      device: req.deviceInfo
    })
  }

})

module.exports = loginLimiter
