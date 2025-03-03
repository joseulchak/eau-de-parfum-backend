import express from 'express'
const router = express.Router()

router.use(function timeLog(req, res, next){
    console.log('Time: ', Date.now())
    next();
})

router.get('/', (req, res) => {
    res.status(200).send("Eau de Parfum | by Geicy Meira")
})

router.get('/about', (req, res) =>{
    res.status(204).send("under construction")
})