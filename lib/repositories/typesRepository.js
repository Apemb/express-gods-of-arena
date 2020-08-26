const { ResourceNotFoundError } = require('../errors')
const { knex } = require('../../db/knex-db-connection')

const typesRepository = {
  listAll: () => {
    return knex('types')
      .returning('*')
  },
}

module.exports = typesRepository
