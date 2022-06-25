import { NextFunction, Request, Response } from "express"
import { APIError, HttpStatus } from "../configs"
import { validateAccessToken } from "../services/auth.service"

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer "))
        throw new APIError(
            "You are not allowed to access this page",
            HttpStatus.UNAUTHORIZED
        )

    const token = authHeader?.split(" ")[1] as string
    const isValidToken = validateAccessToken(token)

    if (!isValidToken)
        throw new APIError(
            "You are not allowed to access this page",
            HttpStatus.UNAUTHORIZED
        )
    next()
}
export default authorize
