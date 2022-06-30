import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"
import { APIError, HttpStatus } from "../configs"

const validate =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            return next()
        } catch {
            next(
                new APIError(
                    "Invalid Request to server",
                    HttpStatus.BAD_REQUEST
                )
            )
        }
    }

export default validate
