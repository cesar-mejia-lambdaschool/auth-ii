require('dotenv').config()
const db = require('../data/db')

module.exports = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/github/callback',
  function (accessToken, refreshToken, profile, done) {
    db('github').insert({ username: profile.id })
    console.log(' 🦄', profile)
    return done(null, profile)
  }
}
