import Fastify from 'fastify'
import { knex } from './db/knex.js'
import { syncAllModels } from './db/sync.js'
import './models/UserModel.js'
import { usersRoutes } from './routes/users.js'

const fastify = Fastify({ logger: true })

fastify.register(usersRoutes, { knex })

async function start() {
  await syncAllModels()

  await fastify.listen({ port: 3000 })

  console.log('🚀 Server rodando em http://localhost:3000')
}

start()
