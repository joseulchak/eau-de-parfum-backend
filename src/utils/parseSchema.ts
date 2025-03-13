import { genericError } from "./error.middleware";
import { GEN_INVALIDY_BODY } from "./messages/messages";

export async function parseSchema<T>(
  schemaToParse: { parse: (input: unknown) => T },
  objectToParse: T,
) {
  if (!objectToParse) return undefined;
  try {
    const parsedObject = schemaToParse.parse(objectToParse);
    return parsedObject;
  } catch (error: any) {
    console.log(error.message);
    const obj = await JSON.parse(error.message);
    let fields = obj
      .map((item: { validation: string }) => item.validation)
      .join(", ");
    genericError(GEN_INVALIDY_BODY, [fields]);
  }
}
