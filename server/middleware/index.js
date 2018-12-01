//* Third-party middleware
const config = require('../config')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const RateLimit = require('express-rate-limit')
// const session = require('express-session')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const apiLimiter = new RateLimit(config.rateLimit)
const db = require('../data/db')

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      const { id, username } = profile
      db('github')
        .insert({ gitHubId: id, username })
        .then(id => cb(null, profile))
        .catch(err => cb(err, false))
    }
  )
)

// const KnexSessionStore = require('connect-session-knex')(session)
// const store = new KnexSessionStore(config.knexSessionStore)

module.exports = server => {
  server.use(express.json())
  server.use(logger('dev'))
  server.use(helmet())
  server.use(cors({ origin: 'http://localhost:3000', credentials: true }))
  server.use(apiLimiter)
  server.use(passport.initialize())
}
