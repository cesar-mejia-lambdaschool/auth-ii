require('dotenv').config()
//! cookie-session config object
module.exports = {
  name: 'this is not a cookie',
  secret: process.env.COOKIE_SECRET,
  maxAge: 15 * 60 * 1000 //* 15 minutes
}
