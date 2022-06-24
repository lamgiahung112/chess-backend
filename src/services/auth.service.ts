import { UserDocument } from "../models/user.model"
import jwt from "jsonwebtoken"

export const generateAccessToken = (user: UserDocument): string => {
    const data = { username: user.username }
    const secret = process.env.JWT_SECRET || "__secret"
    return jwt.sign(data, secret, {
        expiresIn: "30d",
    })
}

export const validateAccessToken = (token: string): boolean => {
    const secret = process.env.JWT_SECRET || "__secret"

    try {
        jwt.verify(token, secret)
        return true
    } catch (error) {
        return false
    }
}
