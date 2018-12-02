const knexSessionStore = require('./knexSessionStore')
const cookieSession = require('./cookieSession')
const expressSession = require('./expressSession')
const rateLimit = require('./rateLimit')
const gitHubStrategy = require('./gitHubStrategy')
const googleStrategy = require('./googleStrategy')
const facebookStrategy = require('./facebookStrategy')
const corsWhitelistWithCredentials = require('./corsWhitelistWithCredentials')
module.exports = {
  knexSessionStore,
  cookieSession,
  expressSession,
  rateLimit,
  gitHubStrategy,
  googleStrategy,
  facebookStrategy,
  corsWhitelistWithCredentials
}
