import { DocumentDefinition } from "mongoose"
import { HttpStatus, APIError } from "../configs"
import User, { UserDocument } from "../models/user.model"

export async function createUser(
    input: DocumentDefinition<UserDocument>
): Promise<UserDocument> {
    try {
        return await User.create(input)
    } catch {
        throw new APIError("Error creating user", HttpStatus.BAD_REQUEST)
    }
}

const validatePassword = async ({
    username,
    password,
}: {
    username: UserDocument["username"]
    password: string
}): Promise<UserDocument> => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new APIError("Invalid Credentitals", HttpStatus.BAD_REQUEST)
    }

    const isValid = user.comparePassword(password)

    if (!isValid)
        throw new APIError("Invalid Credentitals", HttpStatus.BAD_REQUEST)
    return user
}

export { validatePassword }
