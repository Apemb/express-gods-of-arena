const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: parseInt(process.env.DATABASE_CONNECTION_POOL_MAX_SIZE, 10) || 4
    },
    ssl: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'postgres',
      database: 'express-gods-of-arena_test'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
}
