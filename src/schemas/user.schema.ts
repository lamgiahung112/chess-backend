import { object, string } from "yup"

export const createUserSchema = object({
    body: object({
        username: string().required("Username is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters long")
            .matches(
                /^[a-zA-Z0-9_.-]*$/,
                "Password must consist of Latin letters"
            ),
        email: string().required("Email is required").email(),
    }),
})

export const userLoginSchema = object({
    body: object({
        username: string().required("Username is required"),
        password: string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters long")
            .matches(
                /^[a-zA-Z0-9_.-]*$/,
                "Password must consist of Latin letters"
            ),
    }),
})
