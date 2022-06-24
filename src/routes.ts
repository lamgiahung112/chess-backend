import { Application, Request, Response } from "express"
import {
    createUserHandler,
    userLoginHandler,
} from "./controllers/user.controller"
import { validateRequests } from "./middlewares"
import { createUserSchema, userLoginSchema } from "./schemas/user.schema"

export default function initRoute(app: Application) {
    app.get("/api", (req: Request, res: Response) => res.send("ok"))

    // Register user
    app.post(
        "/api/users",
        validateRequests(createUserSchema),
        createUserHandler
    )

    // Login
    app.post(
        "/api/users/access",
        validateRequests(userLoginSchema),
        userLoginHandler
    )
}
