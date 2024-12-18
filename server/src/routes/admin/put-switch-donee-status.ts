import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ClientError } from '../../errors/client-error'
import { db } from '../../lib/firebase'

const ParamsSchema = z.object({
    userID: z.string()
})

export async function putSwitchDoneeStatus(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put(
        '/admin/donees/:userID/switch-status',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        userID: {type:'string'}
                    },
                    required: ['userID']
                }
            }
        },
        async (req, res) => {
            // Se o status for ativo, altera para inativo. Se o status for inativo, altera para ativo.
            try {
                const { userID } = req.params as z.infer<typeof ParamsSchema>
                const userRef = await db.collection('users').doc(userID)
                const userSnapshot = await userRef.get()
                if(!userSnapshot.exists) {
                    return res.status(404).send(new ClientError(`Donatário ${userID} inexistente`))
                }

                const status = (await userSnapshot.data()?.doneeStatus) == 'ativo' ? 'inativo' : 'ativo'

                const updatedDoneeUser = {
                    doneeStatus: status
                }
                await userRef.update(updatedDoneeUser)
                return res.status(200).send()
            } catch(e) {
                console.error(e)
                return res.status(500).send(new ClientError('Erro ao trocar status do donatário'))
            }
        }
    )
}