const db = require('../data/db')
const router = require('express').Router()
const validateUser = require('../middleware/validateUser')

router.get('/', validateUser, getUsers)

//* Route Handler
function getUsers (req, res, next) {
  const { user } = req
  db('local')
    .select('id', 'email', 'password')
    .then(users => {
      res.status(200).json({ users, user })
    })
    .catch(err => res.status(403).json({ message: 'must login', err }))
}

module.exports = router
