import { BASE_URL } from '../utils/constants';
import { Router, Request, Response } from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { secretKey } from '../utils/constants';
import bcrypt from 'bcrypt'
import { genericError } from '../utils/error.middleware';
import { GEN_INVALID_CREDENTIALS, GEN_UNAUTHORIZED } from '../utils/messages';




const router = Router()

router.post(`${BASE_URL}/auth`, async (req: Request, res: Response) => {
    const { username, pwd } = req.body as { username: string, pwd: string }

    const prisma = new PrismaClient()
    const user = await prisma.users.findFirst({
        where: {
            email: username
        }
    })
    console.log(user)

    const pwdMatch = await bcrypt.compare(pwd, user?.password ?? '')
    if (!user || !pwdMatch) {
        return genericError(GEN_INVALID_CREDENTIALS)
    }

    const { password, ...userData } = user

    const accessToken = jwt.sign(userData, secretKey, { expiresIn: '90d' })
    const refreshToken = jwt.sign({ userid: user.id }, secretKey, { expiresIn: '90d' })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    })
    res.send({ accessToken })
})

router.post(`${BASE_URL}/refresh`, async (req: Request, res: Response) => {
    if (!req.cookies?.jwt) {
        return genericError(GEN_UNAUTHORIZED)
    }

    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, secretKey, async (err: VerifyErrors | null, decoded: any) => {
        if (err || !decoded) {
            return genericError(GEN_UNAUTHORIZED)
        }

        const prisma = new PrismaClient()
        const user: any = await prisma.users.findFirst({
            where: {
                id: decoded.id
            }
        })
        console.log(user)
        const { password, ...userData } = user
        const accessToken = jwt.sign(userData, secretKey, { expiresIn: '90d' })
        res.send({ accessToken })
        return
    })
})

export default router