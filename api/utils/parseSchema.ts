import { genericError } from "./genericError"
import { GEN_INVALIDY_BODY } from "./messages"

export function parseSchema(schemaToParse: any, objectToParse: any) {
    if (!objectToParse) return undefined
    try {
        const parsedObject = schemaToParse.parse(objectToParse)
        return parsedObject
    } catch (error: any) {
        console.log(error)
        genericError(GEN_INVALIDY_BODY)
    }
}
