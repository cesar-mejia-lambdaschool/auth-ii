module.exports = passport => {
  const config = require('./index.js')
  const GitHubStrategy = require('passport-github').Strategy
  const FacebookStrategy = require('passport-facebook').Strategy
  const GoogleStrategy = require('passport-google-oauth20').Strategy

  passport.use(
    new GitHubStrategy(
      {
        clientID: config.gitHubStrategy.clientID,
        clientSecret: config.gitHubStrategy.clientSecret,
        callbackURL: config.gitHubStrategy.callbackURL
      },
      config.gitHubStrategy.verifyCallback
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebookStrategy.clientID,
        clientSecret: config.facebookStrategy.clientSecret,
        callbackURL: config.facebookStrategy.callbackURL,
        profileFields: config.facebookStrategy.profileFields
      },
      config.facebookStrategy.verifyCallback
    )
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleStrategy.clientID,
        clientSecret: config.googleStrategy.clientSecret,
        callbackURL: config.googleStrategy.callbackURL
      },
      config.googleStrategy.verifyCallback
    )
  )
  passport.serializeUser((user, done) => {
    console.log('\n ', 'DDDDDlaunched serialize', user.id)

    done(null, user.id)
  })

  passport.deserializeUser((obj, done) => {
    console.log('\n ', 'DDDDlaunched deserialize', obj)
    done(null, obj)
  })
}
