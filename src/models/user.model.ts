import mongoose from "mongoose"
import bcrypt from "bcrypt"

export interface UserDocument extends mongoose.Document {
    username: string
    password: string
    email: string
    updatedAt: Date
    createdAt: Date
    comparePassword: (candidatePassword: string) => boolean
}

const UserSchema = new mongoose.Schema<UserDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

UserSchema.method("comparePassword", function (candidatePassword): boolean {
    return bcrypt.compareSync(candidatePassword, this.password)
})

UserSchema.pre(
    "save",
    function (next: mongoose.CallbackWithoutResultAndOptionalError) {
        const user = this as UserDocument

        if (!user.isModified("password")) return next()

        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(user.password, salt)

        user.password = hashed
        return next()
    }
)

const User = mongoose.model<UserDocument>("users", UserSchema)

export default User
