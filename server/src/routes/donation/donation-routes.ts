import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { createDonation } from "./create-donation"
import { getDonations } from "./get-donations"
import { getDonationByCampaign } from "./get-donation-campaign"
import { updateDonation } from "./update-donation"
import { deleteDonation } from "./delete-donation"

export async function donationRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(createDonation)
        .register(getDonations)
        .register(getDonationByCampaign)
        .register(updateDonation)
        .register(deleteDonation)
}