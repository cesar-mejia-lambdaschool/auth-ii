require('dotenv').config()
const jwt = require('jsonwebtoken')

//* Generate token
module.exports = ({ id, username, department }) => {
  const payload = {
    jwtid: id,
    username: username,
    department: department
  }
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}
