exports.up = function (knex, Promise) {
  return knex.schema.createTable('github', table => {
    table
      .integer('gitHubId')
      .primary()
      .notNull()
    table
      .string('username')
      .notNull()
      .unique()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('github')
}
