import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { BASE_URL } from '../../constants'

const router = Router()

router.post(`${BASE_URL}/user`, async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    const newUser = await prisma.users.create({
        data: {
            email: 'geicy@geicymeira.com.br',
            name: 'Geicy Meira',
            password: '123456',
            active: true,
        }
    })
    res.send({ newUser })
})

export default router