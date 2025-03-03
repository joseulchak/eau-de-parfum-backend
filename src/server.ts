'use strict'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import statusRoutes from './status.route'

const fastify = Fastify({
    logger: true
})

fastify.register(statusRoutes)

// const start = async () => {
//     try {
//         await fastify.listen({ port: 3000 })
//     } catch (err) {
//         fastify.log.error(err)
//     }
// }

export default async function handler(req: FastifyRequest, res: FastifyReply) {
    try {
        await fastify.ready();
        fastify.server.emit('request', req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
  }