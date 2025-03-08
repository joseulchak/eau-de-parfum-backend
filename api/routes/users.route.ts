import { Router, Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client';
import { BASE_URL, saltRounds } from '../utils/constants'
import { parseSchema } from '../utils/parseSchema'
import { usersPostSchema } from '../schemas/users.schema'
import authenticationMiddleware from '../utils/authentication.middleware'
import bcrypt from 'bcrypt'

const router = Router()

router.post(`${BASE_URL}/user`,
    authenticationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = parseSchema(usersPostSchema, req.body)

        const hash = await bcrypt.hash(payload.password, saltRounds)
        const prisma = new PrismaClient()
        const newUser = await prisma.users.create({
            data: {
                ...payload,
                password: hash,
                active: true,
            }
        })
        res.send({ newUser })
    })

export default router