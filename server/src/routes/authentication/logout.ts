import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"

export async function logout(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/logout', async (req, res) => {
            res.clearCookie('token', { path: '/' })
            res.redirect('/')
        }
    )
}