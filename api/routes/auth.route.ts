import { BASE_URL } from '../../constants';
import { Router, Request, Response } from 'express'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'

const secretKey = 'secretKey'
const userCredentials = {
    id: 1,
    user: 'geicy',
    pwd: '123456',
}

const router = Router()

router.post(`${BASE_URL}/auth`, async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string, password: string }

    if (password !== userCredentials.pwd || username !== userCredentials.user) {
        res.status(406).json({
            error: 'invalid credentials'
        })
        return;
    }

    const { pwd, ...userData } = userCredentials

    const accessToken = jwt.sign(userData, secretKey, { expiresIn: '10m' })
    const refreshToken = jwt.sign({ userid: userCredentials.id }, secretKey, { expiresIn: '1d' })

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
        res.status(406).json({ message: 'Unauthorized' })
        return
    }

    const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, secretKey, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err) {
            res.status(406).json({ message: 'Unauthorized' })
            return
        }
        const { pwd, ...userData } = userCredentials
        const accessToken = jwt.sign(userData, secretKey, { expiresIn: '10m' })
        res.send({ accessToken })
        return
    })
})

export default router