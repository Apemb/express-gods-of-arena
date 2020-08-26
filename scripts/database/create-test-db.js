const { Client } = require('pg')

const PG_DATABASE_DUPLICATE_ERROR_CODE = '42P04'

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
  .query('CREATE DATABASE "express-gods-of-arena_test";')
  .then(() => console.log('db created'))
  .catch(error => {
    if (error.code === PG_DATABASE_DUPLICATE_ERROR_CODE) {
      console.log(error.message)
    } else {
      console.error(error)
    }
  })
  .then(() => client.end())
