import "dotenv/config"
import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"

import connect from "./db/connect"
import { handleError } from "./middlewares"
import initRoute from "./routes"
import socket from "./services/socket.service"

const port = process.env.PORT || 3001
const cors_origin = process.env.CORS_ORIGIN as string

const app = express()

app.use(cors())

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: cors_origin,
        credentials: true,
    },
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

initRoute(app)

app.listen(port, () => {
    console.log(`Server running on port ${process.env?.PORT}`)
    connect()
})

// Socket server
httpServer.listen(4000, () => {
    socket(io)
})

app.use(handleError)
