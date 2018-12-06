require('dotenv').config()
const db = require('../data/db')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')

//* Generate token
const generateToken = require('../helpers/generateToken')

module.exports = {
  register: (req, res, next) => {
    const { email, password } = req.body
    console.log('dsjfljsdlfJI', req.session)
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
  },
  login: (req, res, next) => {
    let { email, password } = req.body
    // TODO: Implement JOI for validation

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
  },
  logout: (req, res, next) => {
    req.session = null
    req.logout()
    res.status(200).json({ msg: 'all okay' })
  },

  socialLogin: (req, res, next) => {
    const token = generateToken(req.user)
    req.session.token = token
    res.redirect(`${process.env.CLIENT_URL}/#/users`)
  }
}
