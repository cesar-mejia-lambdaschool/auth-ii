const router = require('express').Router()

const passport = require('passport')
const {
  register,
  login,
  logout,
  socialLogin
} = require('../controllers/authController')
const redirectURL = 'http://localhost:3000/signin'
// const redirectURL = 'https://authii.netlify.com/signin'
//* Local Middleware
const checkCredentials = require('../middleware/checkCredentials')

//* Routes
router.post('/login', login)
router.post('/register', checkCredentials, register)
//* GitHub OAuth
router.get('/auth/github', passport.authenticate('github'))
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL
  }),
  socialLogin
)
//* Facebook OAuth
router.get(
  '/auth/facebook/',
  passport.authenticate('facebook', { scope: ['email'] })
)
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: redirectURL
  }),
  socialLogin
)
//* Google OAuth
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: redirectURL
  }),
  socialLogin
)
//* Destroy cookie session & req.user
router.get('/logout', logout)

module.exports = router
