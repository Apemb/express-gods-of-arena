exports.seed = function (knex) {
  return knex.transaction(trx => {
    return Promise.all([
        knex('types')
          .transacting(trx)
          .insert({name: 'Cavalier'})
          .returning('*'),
        knex('modifiers')
          .transacting(trx)
          .insert([{name: 'Lance'}, {name: 'Épée'}])
          .returning('*'),
      ])
      .then(([insertedTypes, insertedModifiers]) => {
        const cavalryManType = insertedTypes[0]
        const spearModifier = insertedModifiers[0]
        const swordModifier = insertedModifiers[1]

        return knex('gladiators')
          .transacting(trx)
          .insert([
            {name: 'Jeanclaudedus', type_id: cavalryManType.id},
            {name: 'Spiculus', type_id: cavalryManType.id},
          ])
          .returning('*')
          .then((insertedGladiators) => {
            const jeanclaudedus = insertedGladiators[0]

            return knex('gladiator_modifiers')
              .transacting(trx)
              .insert([
                {gladiator_id: jeanclaudedus.id, modifier_id: spearModifier.id},
                {gladiator_id: jeanclaudedus.id, modifier_id: swordModifier.id},
              ])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
