const { expect, knex } = require('../testHelper')

const typesRepository = require('../../lib/repositories/typesRepository')
const { ResourceNotFoundError } = require('../../lib/errors')

describe('typesRepository', () => {

  afterEach(async () => {
    await knex.raw('truncate table types cascade')
  })

  describe('listAll', () => {

    let listAllTypesPromise

    context('no types in db', () => {
      beforeEach(async () => {
        // given

        // when
        listAllTypesPromise = typesRepository.listAll()
      })

      it('should return empty array', () => {
        // then
        return expect(listAllTypesPromise).to.eventually.deep.equal([])
      })
    })

    context('some types in db', () => {
      let existingTypes

      beforeEach(async () => {
        // given
        existingTypes = await knex('types')
          .insert([ { name: 'Archers' }, { name: 'Lancier' }, { name: 'Épéiste' } ])
          .returning('*')

        // when
        listAllTypesPromise = typesRepository.listAll()
      })

      it('should return all existing types', () => {
        // then
        return expect(listAllTypesPromise).to.eventually.deep.equal(existingTypes)
      })
    })
  })
})
