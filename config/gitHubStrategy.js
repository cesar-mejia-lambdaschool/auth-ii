require('dotenv').config()
const db = require('../data/db')

module.exports = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CB,
  verifyCallback: (accessToken, refreshToken, profile, done) => {
    const { id, username, displayName, emails, photos } = profile
    const email = emails[0].value
    const photo = photos[0].value
    db('github')
      .where({ id })
      .first()
      .then(user => {
        if (user && user.id) {
          return done(null, user)
        } else {
          const newUser = {
            id,
            username,
            displayName,
            email,
            photo
          }
          db('github')
            .insert(newUser)
            .then(id => done(null, newUser))
            .catch(err => done(err, false))
        }
      })
  }
}
