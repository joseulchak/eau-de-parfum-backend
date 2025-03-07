import { Router } from 'express'
import authRouter from './auth.route'
import userRouter from './users.route'
const router = Router()

router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date())
    next();
})

router.get('/', (req, res) => {
    res.status(200).send("Eau de Parfum | by Geicy Meira")
})

router.get('/about', (req, res) => {
    res.status(200).send("under construction")
})

router.use(authRouter)
router.use(userRouter)

export default router