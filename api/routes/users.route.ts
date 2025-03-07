import { Router, Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { BASE_URL } from '../../constants'
import { parseSchema } from '../utils/parseSchema'
import { usersPostSchema } from '../schemas/users.schema'
import authenticationMiddleware from '../utils/authentication.middleware'

const router = Router()

router.post(`${BASE_URL}/user`, authenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const payload = parseSchema(usersPostSchema, req.body)
    const prisma = new PrismaClient()
    const newUser = await prisma.users.create({
        data: {
            ...payload,
            active: true,
        }
    })
    res.send({ newUser })

})

export default router