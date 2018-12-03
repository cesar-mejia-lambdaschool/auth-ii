require('dotenv').config()
const jwt = require('jsonwebtoken')

//* Generate token
module.exports = ({ id, email }) => {
  const payload = {
    jwtid: id,
    email
  }
  const options = {
    expiresIn: '15m'
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}
