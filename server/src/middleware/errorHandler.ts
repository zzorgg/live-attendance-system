import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/apiResponse";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) {

  if (err instanceof ZodError) {
    return errorResponse(res, "Invalid request schema", 400)
  }

  // custom api error
  if (err instanceof ApiError) {
   return errorResponse(res, err.message, err.statusCode)
  }

  // jwt error
  if (err.name === "JWTExpired" || err.name === "JWSSignatureVerificationFailed") {
   return errorResponse(res, "Unauthorized, token missing or invalid", 401)
  }

  // need to know what this does
  req.log.error(err, "Unhandled error");

  return errorResponse(res, "Internal Server Error", 500)
}
