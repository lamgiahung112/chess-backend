import { Server, Socket } from "socket.io"
import { v4 } from "uuid"
import { EVENTS } from "../configs/Socket.config"

const rooms: Record<string, { name: string; participants: number }> = {}

const socket = (io: Server) => {
    io.on(EVENTS.connection, (socket: Socket) => {
        console.log(`User connected with id: ${socket.id}`)

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log(`Created room name: ${roomName}`)

            // Create room ID
            const roomID = v4()

            // Add room ID to rooms oject
            rooms[roomID] = {
                name: roomName,
                participants: 1,
            }

            // client is subscribed to new room
            socket.join(roomID)

            // emit to everyone there's a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomID)
        })
    })
}

export default socket
