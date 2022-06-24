import "dotenv/config"
import express from "express"
import connect from "./db/connect"
import initRoute from "./routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(process.env?.PORT || 3000, () => {
    console.log(`Server running on port ${process.env?.PORT}`)
    connect()
    initRoute(app)
})
