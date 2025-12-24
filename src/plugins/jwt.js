import fp from 'fastify-plugin'

export default fp(async (fastify) => {
  await fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'change-me'
  })

  fastify.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify()
    } catch {
      reply.code(401).send({ message: 'Não autorizado' })
    }
  })
})
