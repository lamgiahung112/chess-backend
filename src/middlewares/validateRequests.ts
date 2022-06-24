import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"
import { HttpStatus } from "../configs"

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
        } catch (error: any) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ errors: error?.errors })
        }
    }

export default validate
