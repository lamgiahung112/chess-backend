import { object, string, ref } from "yup"

export const createUserSchema = object({
    body: object({
        username: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .min(
                6,
                "Password is too short - should be at least 6 characters long"
            )
            .matches(
                /^[a-zA-Z0-9_.-]*$/,
                "Password can only contain Latin letters"
            ),
        passwordConfirmation: string().oneOf(
            [ref("passowrd"), null],
            "Passwords must match"
        ),
    }),
})

export const userLoginSchema = object({
    body: object({
        username: string().required("Username is required"),
        password: string()
            .required("Password is required")
            .min(
                6,
                "Password is too short - should be at least 6 characters long"
            )
            .matches(
                /^[a-zA-Z0-9_.-]*$/,
                "Password can only contain Latin letters"
            ),
    }),
})
