exports.seed = function (knex) {
  return knex.transaction(trx => {
    return Promise.all([
        knex('types')
          .transacting(trx)
          .insert({name: 'Lancier'})
          .returning('*')
      ])
      .then(([insertedTypes,]) => {
        const spearManType = insertedTypes[0]

        return knex('gladiators')
          .transacting(trx)
          .insert([
            {name: 'Ganicus', type_id: spearManType.id},
            {name: 'Crixus', type_id: spearManType.id},
          ])
          .returning('*')
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
