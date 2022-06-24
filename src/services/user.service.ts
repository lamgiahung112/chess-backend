import { DocumentDefinition } from "mongoose"
import User, { UserDocument } from "../models/user.model"

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input)
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function validatePassword({
    username,
    password,
}: {
    username: UserDocument["username"]
    password: string
}) {
    const user = await User.findOne({ username })

    if (!user) {
        return false
    }

    const isValid = user.comparePassword(password)

    if (!isValid) return false
    return user
}
