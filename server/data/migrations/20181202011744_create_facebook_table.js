exports.up = function (knex, Promise) {
  return knex.schema.createTable('facebook', table => {
    table
      .integer('id')
      .primary()
      .unique()
      .notNull()
    table.string('givenName')
    table.string('familyName ')
    table.string('displayName')
    table.string('email').unique()
    table.string('photo')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('facebook')
}
