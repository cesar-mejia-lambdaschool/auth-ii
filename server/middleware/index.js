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
const cookieSession = require('cookie-session')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      const { id, username, displayName, emails, photos } = profile
      db('github')
        .where({ id })
        .first()
        .then(user => {
          if (user && user.id) {
            return done(null, user)
          } else {
            db('github')
              .insert({
                id,
                username,
                displayName,
                email: emails[0].value,
                photo: photos[0].value
              })
              .then(id => done(null, profile))
              .catch(err => done(err, false))
          }
        })
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:8000/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'name', 'emails', 'photos']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(' 🍌', profile)
      console.log('\n 💥', accessToken)
      const {
        id,
        name: { givenName, familyName },
        displayName,
        emails,
        photos
      } = profile

      db('facebook')
        .where({ id })
        .first()
        .then(user => {
          if (user && user.id) {
            return done(null, user)
          } else {
            db('facebook')
              .insert({
                id,
                givenName,
                familyName,
                displayName,
                email: emails[0].value,
                photo: photos[0].value
              })
              .then(id => done(null, profile))
              .catch(err => done(err, false))
          }
        })
    }
  )
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const {
        id,
        name: { givenName, familyName },
        displayName,
        emails,
        photos
      } = profile
      const email = emails[0].value
      const photo = photos[0].value

      console.log(' 🤕', profile)
      console.log('id', typeof id)
      console.log('givenName', typeof givenName)
      console.log('familyName', typeof familyName)
      console.log('emails', typeof email)
      console.log('photos', typeof photo)

      db('google')
        .where({ id })
        .first()
        .then(user => {
          if (user && user.id) {
            return done(null, user)
          } else {
            db('google')
              .insert({
                id,
                givenName,
                familyName,
                displayName,
                email: emails[0].value,
                photo: photos[0].value
              })
              .then(id =>
                done(null, { id, givenName, familyName, emails, photo })
              )
              .catch(err => done(err, false))
          }
        })
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

module.exports = server => {
  server.use(express.json())
  server.use(logger('dev'))
  server.use(helmet())
  server.use(cors({ origin: 'http://localhost:3000', credentials: true }))
  server.use(apiLimiter)
  server.use(
    cookieSession({
      name: 'this-is-not-a-cookie',
      secret: 'cookie-secret',
      maxAge: 1000 * 60 * 15
    })
  )
  server.use(passport.initialize())
  server.use(passport.session())
}
