import { BASE_URL } from '../../constants';
import { Router } from 'express'
import jwt from 'jsonwebtoken'

const secretKey = 'secretKey'
const userCredentials = {
    user: 'geicy',
    pwd: '123456',
}

const router = Router()

router.post(`${BASE_URL}/auth`, async(req, res) => {
    const { username, password } = req.body as { username: string, password: string }

    if (password !== userCredentials.pwd) {
        res.status(403).json({
            error: 'invalid credentials'
        })
        return;
    }

    const { pwd, ...userData } = userCredentials

    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' })

    res.cookie('token', token)
    res.send('authenticated!')
})

export default router