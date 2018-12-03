exports.up = function (knex, Promise) {
  return knex.schema.createTable('github', table => {
    table
      .integer('id')
      .primary()
      .unique()
      .notNull()
    table
      .string('username')
      .notNull()
      .unique()
    table.string('displayName')
    table.string('email').unique()
    table.string('photo')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('github')
}
