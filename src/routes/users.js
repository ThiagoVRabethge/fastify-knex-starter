export async function usersRoutes(fastify, { knex }) {
  fastify.post('/users', async (req, reply) => {
    const { name, email } = req.body
    if (!name || !email) {
      return reply.code(400).send({ message: 'name e email obrigatórios' })
    }

    const [id] = await knex('users').insert({
      name,
      email,
      teste_teste: ''
    })

    return reply.code(201).send({ id })
  })

  fastify.get('/users', async () => knex('users'))

  fastify.get('/users/:id', async (req, reply) => {
    const user = await knex('users')
      .where({ id: req.params.id })
      .first()

    if (!user) {
      return reply.code(404).send({ message: 'Usuário não encontrado' })
    }

    return user
  })
}
