import { Router } from "express"
import { validateRequests } from "../middlewares"
import { createUserSchema, userLoginSchema } from "../schemas/user.schema"
import {
    createUserHandler,
    userLoginHandler,
} from "../controllers/user.controller"

const router = Router()

// [ROUTES]: /api/users

router.route("/").post(validateRequests(createUserSchema), createUserHandler)
router
    .route("/access")
    .post(validateRequests(userLoginSchema), userLoginHandler)

export default router
