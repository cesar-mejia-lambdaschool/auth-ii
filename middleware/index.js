//* Third-party middleware
const config = require('../config')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const cookieSession = require('cookie-session')
const RateLimit = require('express-rate-limit')
const passport = require('passport')

const apiLimiter = new RateLimit(config.rateLimit)

require('../config/passportConfig')(passport)

module.exports = server => {
  server.use(express.json())
  server.use(logger('dev'))
  server.use(helmet())
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CLIENT_ORIGIN)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.header('Access-Control-Allow-Credentials', true)
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204)
    }
    next()
  })
  server.use(cors(config.corsWhitelistWithCredentials))
  server.use(cookieSession(config.cookieSession))
  server.use(apiLimiter)
  server.use(passport.initialize())
  server.use(passport.session())
}
