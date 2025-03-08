import { GEN_INTERNAL_SERVER_ERROR, getMessage } from "./messages/messages";
import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  errorCode: number; // Add your custom property here

  constructor(message: string, errorCode: number) {
    super(message);
    this.name = "CustomError";
    this.errorCode = errorCode;
  }
}

export function genericError(msg: any, params: string[] = []) {
  const errorMessage = getMessage(msg, params, true);
  throw new CustomError(errorMessage.message, errorMessage.statusCode || 500);
  //throw new Error(errorMessage.message)
}

export function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("ERROR", err);
  res
    .status(err.errorCode ?? GEN_INTERNAL_SERVER_ERROR.errorCode)
    .send({
      message:
        err.name === "CustomError"
          ? err.message
          : GEN_INTERNAL_SERVER_ERROR.message,
    });
}
