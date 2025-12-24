import Fastify from 'fastify'
import { knex } from './db/knex.js'
import { syncAllModels } from './db/sync.js'
import './models/UserModel.js'
import jwtPlugin from './plugins/jwt.js'
import authRoutes from './routes/auth.js'

const fastify = Fastify({ logger: true })

fastify.decorate('knex', knex)

await fastify.register(jwtPlugin)

fastify.register(authRoutes)

async function start() {
  try {
    await syncAllModels()

    await fastify.listen({ port: 3000, host: '0.0.0.0' })

    console.log('🚀 Server rodando em http://localhost:3000')

  } catch (err) {
    fastify.log.error(err)

    process.exit(1)
  }
}

start()
