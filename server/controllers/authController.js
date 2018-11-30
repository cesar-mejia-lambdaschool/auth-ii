require('dotenv').config()

const db = require('../data/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//* Generate token
function generateToken ({ id, username, department }) {
  const payload = {
    jwtid: id,
    username: username,
    department: department
  }
  const options = {
    expiresIn: 15 * 60 * 1000
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

//* Verify token

module.exports = {
  // # place jwt token on req.session
  // # req.session made available by cookie-session)

  registerUser: (req, res, next) => {
    const user = req.body

    //* Hash password
    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash

    db('users')
      .insert(user)
      .then(ids => {
        const token = generateToken(user)
        //* token placed here
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
    if (req.session) {
      req.session = null
      res.status(200).json('message: cookie destroyed')
    }
  }
}
