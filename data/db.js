const knex = require('knex')
const { production: config } = require('../knexfile.js')

module.exports = knex(config)
