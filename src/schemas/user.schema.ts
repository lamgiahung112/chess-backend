import { object, string, ref } from "yup"

export const createUserSchema = object({
    body: object({
        username: string().required(),
        password: string()
            .required()
            .min(6)
            .matches(/^[a-zA-Z0-9_.-]*$/),
        passwordConfirmation: string().oneOf([ref("password"), null]),
    }),
})

export const userLoginSchema = object({
    body: object({
        username: string().required(),
        password: string()
            .required()
            .min(6)
            .matches(/^[a-zA-Z0-9_.-]*$/),
    }),
})
