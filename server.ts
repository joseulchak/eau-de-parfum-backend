'use strict'
import Fastify from 'fastify'
import statusRoutes from './src/status.route'

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

export default async function handler(req: any, res: any) {
    await fastify.ready()
    fastify.server.emit('request', req, res)
  }