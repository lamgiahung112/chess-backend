import { Server, Socket } from "socket.io"
import { EVENTS } from "../configs/Socket.config"

const socket = (io: Server) => {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(socket.id)
    })
}

export default socket
