import { NextFunction, Request, Response } from "express"
import { createUser, validatePassword } from "../services/user.service"
import { HttpStatus, HttpResponse } from "../configs"
import { generateAccessToken } from "../services/auth.service"

export async function createUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data: HttpResponse = {
        payload: null,
    }

    try {
        const user = await createUser(req.body)
        data.payload = user
        return res.status(HttpStatus.OK).json(data)
    } catch (error) {
        next(error)
    }
}

export async function userLoginHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data: HttpResponse = {
        payload: null,
    }

    try {
        const validUser = await validatePassword(req.body)
        const accessToken = generateAccessToken(validUser)
        data.payload = { accessToken }
        return res.status(HttpStatus.OK).json(data)
    } catch (error) {
        next(error)
    }
}
