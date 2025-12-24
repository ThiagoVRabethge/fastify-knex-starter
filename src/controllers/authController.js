import bcrypt from 'bcrypt'
import { sanitizeUser } from '../utils/sanitizeUser.js'

export async function registerController(req, reply) {
  const { login, password } = req.body

  const knex = req.server.knex

  const jwt = req.server.jwt

  if (!login || !password) {
    return reply.code(400).send({
      message: 'login e password obrigatórios'
    })
  }

  const normalizedLogin = login.trim().toLowerCase()

  const hash = await bcrypt.hash(password, 10)

  const [id] = await knex('users').insert({
    login: normalizedLogin,
    password: hash
  })

  const user = await knex('users')
    .where({ id })
    .first()

  const token = jwt.sign({
    sub: user.id,
    login: user.login
  })

  return reply.code(201).send({
    user: sanitizeUser(user),
    token
  })
}

export async function loginController(req, reply) {
  const { login, password } = req.body

  const knex = req.server.knex

  const jwt = req.server.jwt

  const normalizedLogin = login.trim().toLowerCase()

  const user = await knex('users')
    .where({ login: normalizedLogin })
    .first()

  if (!user) {
    return reply.code(401).send({
      message: 'Credenciais inválidas'
    })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return reply.code(401).send({
      message: 'Credenciais inválidas'
    })
  }

  const token = jwt.sign({
    sub: user.id,
    login: user.login
  })

  return reply.send({
    user: sanitizeUser(user),
    token
  })
}
