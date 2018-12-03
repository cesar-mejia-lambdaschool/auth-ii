exports.up = function (knex, Promise) {
  return knex.schema.createTable('google', table => {
    table
      .string('id')
      .primary()
      .unique()
      .notNull()
    table.string('givenName')
    table.string('familyName ')
    table.string('displayName')
    table.string('email')
    table.string('photo')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('google')
}
