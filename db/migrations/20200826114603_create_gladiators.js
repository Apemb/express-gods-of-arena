exports.up = function (knex) {
  return knex.schema
    .createTable('gladiators', table => {
      table
        .uuid('id')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable()
        .primary()
      table.string('name')
      table.uuid('type_id').notNullable()
      table.foreign('type_id').references('types.id')
    })
    .then(() => {
      return knex.schema
        .createTable('gladiator_modifiers', table => {
          table
            .uuid('id')
            .defaultTo(knex.raw('uuid_generate_v4()'))
            .notNullable()
            .primary()
          table.uuid('gladiator_id').notNullable()
          table
            .foreign('gladiator_id')
            .references('gladiators.id')
            .onDelete('CASCADE')
          table.uuid('modifier_id').notNullable()
          table
            .foreign('modifier_id')
            .references('modifiers.id')
            .onDelete('CASCADE')
        })
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('gladiator_modifiers')
    .then(() => knex.schema.dropTable('gladiators'))
}
