// TODO: Think seriously regarding how to gracefully manage
// TODO: multiple auth strategies for a each user

exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('local', table => {
      table.uuid('id').primary()
      table
        .string('email')
        .unique()
        .notNull()
      table.string('password').notNull()
      table.timestamps(true, true)
    })
    .then(() => {
      return knex.schema.createTable('github', table => {
        table
          .string('id')
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
        table.timestamps(true, true)
      })
    })
    .then(() => {
      return knex.schema.createTable('facebook', table => {
        table
          .string('id')
          .primary()
          .unique()
          .notNull()
        table.string('givenName')
        table.string('familyName ')
        table.string('displayName')
        table.string('email').unique()
        table.string('photo')
        table.timestamps(true, true)
      })
    })
    .then(() => {
      return knex.schema.createTable('google', table => {
        table
          .string('id')
          .primary()
          .unique()
          .notNullable()
        table.string('givenName')
        table.string('familyName ')
        table.string('displayName')
        table.string('email')
        table.string('photo')
        table.timestamps(true, true)
      })
    })
    .then(() => {
      return knex.schema.createTable('user_details', table => {
        table.uuid('id').primary()
        table.string('displayName').notNull()
        table
          .uuid('localId')
          .references('id')
          .inTable('local')
          .onDelete('SET NULL')
          .onUpdate('CASCADE')
        table
          .string('githubId')
          .references('id')
          .inTable('github')
          .onDelete('SET NULL')
          .onUpdate('CASCADE')
        table
          .string('facebookId')
          .references('id')
          .inTable('facebook')
          .onDelete('SET NULL')
          .onUpdate('CASCADE')
        table
          .string('googleId')
          .references('id')
          .inTable('google')
          .onDelete('SET NULL')
          .onUpdate('CASCADE')
      })
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('user_details')
    .dropTableIfExists('local')
    .dropTableIfExists('github')
    .dropTableIfExists('facebook')
    .dropTableIfExists('google')
}
