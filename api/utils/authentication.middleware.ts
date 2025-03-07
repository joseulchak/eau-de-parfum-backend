import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { secretKey } from './constants'

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers['authorization']

    if(!accessToken){
        res.status(406).json({ message: 'Unauthorized' })
        return 
    }

    jwt.verify(accessToken, secretKey, async(err: VerifyErrors | null, decoded: any) => {
        if (err || !decoded) {
            res.status(406).json({ message: 'Unauthorized' })
            return
        }
        next()
    })
}

export default authenticationMiddleware