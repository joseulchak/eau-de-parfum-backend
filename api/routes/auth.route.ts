import { BASE_URL } from '../../constants';
import '../@types/session.type';
import { Router } from 'express'


const router = Router()

router.post(`${BASE_URL}/auth`, (req, res) => {
    res.send('auth endpoint!')
})

export default router