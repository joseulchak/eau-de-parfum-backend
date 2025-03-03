import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function statusRoutes(fastify: FastifyInstance) {
    fastify.get('/status', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ status: "ok" })
    })

    fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ status: "Eau de Parfum" })
    })
}