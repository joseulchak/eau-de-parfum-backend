import { getMessage } from "./messages"

class CustomError extends Error {
    errorCode: number // Add your custom property here

    constructor(message: string, errorCode: number) {
        super(message)
        this.name = 'CustomError'
        this.errorCode = errorCode
    }
}

export function genericError(msg: any, params: string[] = []) {
    const errorMessage = getMessage(msg, params, true)
    throw new CustomError(errorMessage.message, errorMessage.statusCode || 500)
}
