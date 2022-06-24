import { NextFunction, Request, Response } from "express"
import { HttpStatus } from "../configs"
import { validateAccessToken } from "../services/auth.service"

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith("Bearer "))
        return res.status(HttpStatus.UNAUTHORIZED).send()
    const token = authHeader?.split(" ")[1] as string

    const isValidToken = validateAccessToken(token)

    if (!isValidToken) return res.status(HttpStatus.UNAUTHORIZED).send()
    next()
}
export default authorize
