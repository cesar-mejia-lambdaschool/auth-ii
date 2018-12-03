require('dotenv').config()

const jwt = require('jsonwebtoken')
const util = require('util')

const jwtVerifyAsync = util.promisify(jwt.verify)

async function validateUser (req, res, next) {
  const token = req.session.token
  if (!token) {
    return res.status(401).json({ error: 'you shall not pass!! - no token' })
  }

  try {
    const decodedToken = await jwtVerifyAsync(token, process.env.JWT_SECRET)
    req.payload = decodedToken
    next()
  } catch (err) {
    res.status(401).json({ error: 'you  shall not pass!! - token invalid', err })
  }
}

module.exports = validateUser
