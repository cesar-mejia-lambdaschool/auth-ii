require('dotenv').config()
const db = require('../data/db')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const router = require('express').Router()
const passport = require('passport')
const redirectURL = `${process.env.CLIENT_URL}/signin`

//* Import Helpers/Middleware
const generateToken = require('../helpers/generateToken')
const checkCredentials = require('../middleware/checkCredentials')

//* Email/Password-Hash Strategy
router.post('/login', login)
router.post('/register', checkCredentials, register)

//* Destroy cookie session & req.user
router.get('/logout', logout)

//* GitHub OAuth
router.get('/github', passport.authenticate('github'))
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

//* Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

//* Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: redirectURL
  }),
  socialLogin
)

//* Route Handlers
function register (req, res, next) {
  const { email, password } = req.body
  const user = { email, password }
  user.password = bcrypt.hashSync(password, Number(process.env.HASH_ROUNDS))
  user.id = uuid()

  db('local')
    .insert(user)
    .then(ids => {
      const id = ids[0]
      const token = generateToken({ email, id })
      req.session.token = token
      res.status(201).json({ msg: 'Registration Successful!' })
    })
    .catch(next)
}

function login (req, res, next) {
  let { email, password } = req.body

  db('local')
    .where({ email })
    .first()
    .then(user => {
      bcrypt.compare(password, user.password).then(isValid => {
        if (isValid) {
          const token = generateToken(user)
          req.session.token = token
          res.status(200).json({ msg: 'login successful' })
        } else {
          res.status(401).json({ msg: 'login failed' })
        }
      })
    })
    .catch(next)
}
function logout (req, res, next) {
  req.session = null
  req.logout()
  res.status(200).json({ msg: 'all okay' })
}

function socialLogin (req, res, next) {
  const token = generateToken(req.user)
  req.session.token = token
  res.redirect(`${process.env.CLIENT_URL}/users`)
}

module.exports = router
