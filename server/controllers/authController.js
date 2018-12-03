require('dotenv').config()
const db = require('../data/db')
const bcrypt = require('bcryptjs')

//* Generate token
const generateToken = require('../helpers/generateToken')

module.exports = {
  // # place jwt token on req.session
  // # req.session made available by cookie-session)

  registerUser: (req, res, next) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash

    db('users')
      .insert(user)
      .then(ids => {
        const token = generateToken(user)
        req.session.token = token
        res.status(201).json({ msg: 'Registration Successful!' })
      })
      .catch(next)
  },
  loginUser: (req, res, next) => {
    let { username, password } = req.body
    username = username.toLowerCase()

    db('users')
      .where({ username })
      .first()
      .then(user => {
        bcrypt.compare(password, user.password).then(isPasswordValid => {
          if (isPasswordValid) {
            const token = generateToken(user)
            req.session.token = token
            res.status(200).json({ msg: 'login successful' })
          } else {
            res.status(401).json({ msg: 'login failed' })
          }
        })
      })
      .catch(next)
  },
  logoutUser: (req, res, next) => {
    res.session = null
    req.logout()
    res.status(200).json({ msg: 'all okay' })
  },
  socialLogin: (req, res, next) => {
    const token = generateToken(req.user)
    req.session.token = token
    res.redirect(`${process.env.CLIENT}/users`)
  }
}
