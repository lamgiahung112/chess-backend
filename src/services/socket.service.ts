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

            socket.join(roomID)

            // emit to everyone there's a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.ROOMS, rooms)

            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomID)
        })

        socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ _roomID, username }) => {
            console.log(
                `User with id ${socket.id} joined room: ${rooms[_roomID].name}`
            )

            socket.join(_roomID)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, _roomID)
            socket.broadcast.emit(EVENTS.SERVER.PLAYER_JOIN_CLIENT_ROOM, {
                username,
            })
        })

        socket.on(EVENTS.CLIENT.LEAVE_ROOM, ({ _roomID }) => {
            socket.leave(_roomID)
        })
    })
}

export default socket
