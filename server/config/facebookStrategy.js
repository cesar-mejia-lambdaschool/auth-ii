require('dotenv').config()
const db = require('../data/db')

module.exports = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8000/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'emails', 'photos'],
  verifyCallback: (accessToken, refreshToken, profile, done) => {
    const {
      id,
      name: { givenName, familyName },
      displayName,
      emails,
      photos
    } = profile
    const email = emails[0].value
    const photo = photos[0].value

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
              email,
              photo
            })
            .then(id => done(null, profile))
            .catch(err => done(err, false))
        }
      })
  }
}
