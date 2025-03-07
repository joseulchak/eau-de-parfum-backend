import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { BASE_URL } from '../../constants'
import { parseSchema } from '../utils/parseSchema'
import { usersPostSchema } from '../schemas/users.schema'

const router = Router()

router.post(`${BASE_URL}/user`, async (req: Request, res: Response) => {
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