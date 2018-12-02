const router = require('express').Router()
const passport = require('passport')
const { loginUser, registerUser } = require('../controllers/authController')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../data/db')

//* Generate token
function generateToken ({ id, username, department }) {
  const payload = {
    jwtid: id,
    username: username,
    department: department
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, process.env.SECRET, options)
}

//* Local Middleware
const checkCredentials = require('../middleware/checkCredentials')

//* Routes
router.post('/login', loginUser)

router.post('/register', checkCredentials, registerUser)

router.get('/auth/github', passport.authenticate('github'))

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:3000/login'
  }),
  (req, res) => {
    const token = generateToken(req.user)
    req.session.token = token
    req.user.token = token
    // req.cookie.token = token
    console.log('\n 🦄', req.session)
    console.log('\n 🥇', req.user)
    res.redirect('http://localhost:3000/users')
  }
)

router.get(
  '/auth/facebook/',
  passport.authenticate('facebook', { scope: ['email'] })
)

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/login'
  }),
  (req, res) => {
    const token = generateToken(req.user)
    req.session.token = token
    console.log('\n 🦄', req.session)
    console.log('\n 🥇', req.user)
    res.redirect('http://localhost:3000/users')
  }
)

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login'
  }),
  (req, res) => {
    const token = generateToken(req.user)
    req.session.token = token
    console.log('\n 🦄', req.session)
    console.log('\n 🥇', req.user)
    res.redirect('http://localhost:3000/users')
  }
)

router.get('/logout', (req, res, next) => {
  res.session = null
  req.logout()
  res.status(200).json({ msg: 'all okay' })
})
module.exports = router
