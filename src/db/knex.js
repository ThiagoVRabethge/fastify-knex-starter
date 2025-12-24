import knexLib from 'knex'

export const knex = knexLib({
  client: 'sqlite3',
  connection: { filename: './database.sqlite' },
  useNullAsDefault: true
})
