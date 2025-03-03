'use strict'
import Fastify from 'fastify'
import statusRoutes from './status.route'

const fastify = Fastify({
    logger: true
})

fastify.register(statusRoutes)

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
    }
}

start()