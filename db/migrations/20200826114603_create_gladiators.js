exports.up = function (knex) {
  return knex.schema
    .createTable('fighters', table => {
      table
        .uuid('id')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable()
        .primary()
      table.uuid('type_id').notNullable()
      table.foreign('type_id').references('types.id')
    })
    .then(() => {
      return knex.schema
        .createTable('fights', table => {
          table
            .uuid('id')
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .notNullable()
            .primary()
          table.uuid('gladiator1_id').notNullable()
          table
            .foreign('gladiator1_id')
            .references('fighters.id')
            .onDelete('CASCADE')
          table.uuid('gladiator2_id').notNullable()
          table
            .foreign('gladiator2_id')
            .references('fighters.id')
            .onDelete('CASCADE')
        })
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('gladiator_modifiers')
    .then(() => knex.schema.dropTable('gladiators'))
}
