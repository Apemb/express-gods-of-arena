const { Client } = require('pg')

const PG_DATABASE_NON_EXISTANT_ERROR_CODE = '3D000'

if (process.env.NODE_ENV !== 'test') {
  throw `Script only works for test database, but process env was: ${process.env.NODE_ENV}`
}

// todo get config from config file
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'postgres'
})

client.connect()

client
  .query('DROP DATABASE "express-gods-of-arena_test";')
  .then(() => console.log('db deleted'))
  .catch(error => {
    if (error.code === PG_DATABASE_NON_EXISTANT_ERROR_CODE) {
      console.log(error.message)
    } else {
      console.error(error)
    }
  })
  .then(() => client.end())
