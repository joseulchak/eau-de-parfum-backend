import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { secretKey } from './constants'
import { genericError } from './error.middleware'
import { GEN_UNAUTHORIZED } from './messages'

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers['authorization']

    if(!accessToken){
        return genericError(GEN_UNAUTHORIZED)
    }

    jwt.verify(accessToken, secretKey, async(err: VerifyErrors | null, decoded: any) => {
        if (err || !decoded) {
            return genericError(GEN_UNAUTHORIZED)
        }
        next()
    })
}

export default authenticationMiddleware