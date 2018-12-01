const router = require('express').Router()
const passport = require('passport')
const { loginUser, registerUser } = require('../controllers/authController')

//* Local Middleware
const checkCredentials = require('../middleware/checkCredentials')

//* Routes
router.post('/login', loginUser)

router.post('/register', checkCredentials, registerUser)

router.get('/auth/github', passport.authenticate('github', { session: false }))

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false,
    successRedirect: '/',
    failureFlash: true
  }),
  (req, res) => {
    console.log(' 🍔', req.user)
    res.redirect('/')
  }
)
module.exports = router
