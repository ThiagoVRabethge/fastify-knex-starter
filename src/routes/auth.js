import { loginController, registerController } from '../controllers/authController.js'

export default async function authRoutes(fastify) {
  fastify.post('/auth/register', registerController)

  fastify.post('/auth/login', loginController)
}
