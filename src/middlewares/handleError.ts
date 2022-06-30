import { NextFunction, Request, Response } from "express"
import { HttpStatus, APIError } from "../configs"

const handleError = (
    err: TypeError | APIError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let customErr = err
    if (!(err instanceof APIError)) {
        customErr = new APIError(
            "Oops something went wrong",
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }

    return res
        .status((customErr as APIError).status)
        .json({ errors: customErr })
}

export default handleError
