import { Application } from "express"
import userRoute from "./user.route"

export default function initRoute(app: Application) {
    app.use("/api/users", userRoute)
}
