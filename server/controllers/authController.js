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
    expiresIn: '1h'
  }
  return jwt.sign(payload, process.env.SECRET, options)
}

module.exports = {
  registerUser: (req, res, next) => {
    const user = req.body

    const hash = bcrypt.hashSync(user.password, 14)
    user.password = hash

    db('users')
      .insert(user)
      .then(ids => {
        const token = generateToken(user)
        res.status(201).json({ msg: 'Registration Successful!', token })
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
            res.status(200).json({ msg: 'login successful', token })
          } else {
            res.status(401).json({ msg: 'login failed' })
          }
        })
      })
      .catch(next)
  }
}
