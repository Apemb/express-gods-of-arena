exports.up = function (knex) {
  return knex.schema
    .createTable('types', table => {
      table
        .uuid('id')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable()
        .primary()
      table.string('name')
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('types')
}
