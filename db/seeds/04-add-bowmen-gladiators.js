exports.seed = function (knex) {
  return knex.transaction(trx => {
    return Promise.all([
        knex('types')
          .transacting(trx)
          .insert({name: 'Archer'})
          .returning('*')
      ])
      .then(([insertedTypes,]) => {
        const bowManType = insertedTypes[0]

        return knex('gladiators')
          .transacting(trx)
          .insert([
            {name: 'Commodus', type_id: bowManType.id},
            {name: 'Flamma', type_id: bowManType.id},
          ])
          .returning('*')
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
