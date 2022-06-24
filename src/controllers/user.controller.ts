import { Request, Response } from "express"
import { createUser, validatePassword } from "../services/user.service"
import { HttpStatus } from "../configs"
import { generateAccessToken } from "../services/auth.service"

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body)
        return res.send(user)
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).send(error)
    }
}

export async function userLoginHandler(req: Request, res: Response) {
    try {
        const validUser = await validatePassword(req.body)

        if (!validUser) return res.status(HttpStatus.BAD_REQUEST).send()

        const accessToken = generateAccessToken(validUser)
        res.status(HttpStatus.OK).json({
            accessToken,
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error)
    }
}
