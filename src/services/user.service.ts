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
    const isValid = user?.comparePassword(password)

    if (!user || !isValid) {
        throw new APIError("Invalid Credentials", HttpStatus.BAD_REQUEST)
    }

    return user
}

export { validatePassword }
