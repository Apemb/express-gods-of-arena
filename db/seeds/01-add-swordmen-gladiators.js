exports.seed = function (knex) {
  return knex.transaction(trx => {
    return Promise.all([
        knex('types')
          .transacting(trx)
          .insert({name: 'Épéiste'})
          .returning('*'),
        knex('modifiers')
          .transacting(trx)
          .insert([{name: 'Épée à une main'}, {name: 'Épée à deux mains'}])
          .returning('*'),
      ])
      .then(([insertedTypes, insertedModifiers]) => {
        const swordManType = insertedTypes[0]
        const oneHandSwordModifier = insertedModifiers[0]
        const twoHandSwordModifier = insertedModifiers[1]

        return knex('gladiators')
          .transacting(trx)
          .insert([
            {name: 'Maximus', type_id: swordManType.id},
            {name: 'Spartacus', type_id: swordManType.id},
            {name: 'Priscus', type_id: swordManType.id},
            {name: 'Pollux', type_id: swordManType.id},
          ])
          .returning('*')
          .then((insertedGladiators) => {
            const maximus = insertedGladiators[0]
            const spartacus = insertedGladiators[1]

            return knex('gladiator_modifiers')
              .transacting(trx)
              .insert([
                {gladiator_id: maximus.id, modifier_id: oneHandSwordModifier.id},
                {gladiator_id: maximus.id, modifier_id: twoHandSwordModifier.id},
                {gladiator_id: spartacus.id, modifier_id: oneHandSwordModifier.id},
                {gladiator_id: spartacus.id, modifier_id: twoHandSwordModifier.id},
              ])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
