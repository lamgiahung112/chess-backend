import { Server, Socket } from "socket.io"
import { v4 } from "uuid"
import { EVENTS } from "../configs/Socket.config"
import { IGameData } from "../configs/Game.config"

const rooms: Record<
    string,
    { name: string; participants: number; hasWhiteSide: boolean }
> = {}

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
                hasWhiteSide: true,
            }

            socket.join(roomID)

            // emit to everyone there's a new room
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.ROOMS, rooms)

            socket.emit(EVENTS.SERVER.JOINED_ROOM, { roomID, side: "W" })
        })

        socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ _roomID, username }) => {
            if (!rooms[_roomID] || rooms[_roomID].participants >= 2) return
            console.log(
                `User with id ${socket.id} joined room: ${rooms[_roomID].name}`
            )
            rooms[_roomID].participants++

            socket.join(_roomID)
            socket.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, {
                roomID: _roomID,
                side: rooms[_roomID].hasWhiteSide ? "B" : "W",
            })
            socket.broadcast.emit(EVENTS.SERVER.PLAYER_JOIN_CLIENT_ROOM, {
                username,
            })
        })

        socket.on(EVENTS.CLIENT.REFRESH_ROOM, () => {
            socket.emit(EVENTS.SERVER.ROOMS, rooms)
        })

        socket.on(EVENTS.CLIENT.LEAVE_ROOM, ({ _roomID, side }) => {
            socket.leave(_roomID)
            rooms[_roomID].participants--
            rooms[_roomID].hasWhiteSide =
                rooms[_roomID].hasWhiteSide && side !== "W"

            if (rooms[_roomID].participants === 0) {
                delete rooms[_roomID]
            }

            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms)
            socket.emit(EVENTS.SERVER.ROOMS, rooms)
        })

        // on Client move, change side and send gamedata back to the other client
        socket.on(
            EVENTS.CLIENT.MOVE,
            ({ room, gameData }: { room: string; gameData: IGameData }) => {
                socket.to(room).emit(EVENTS.SERVER.UPDATE_GAME_DATA, gameData)
                socket.broadcast
                    .to(room)
                    .emit(EVENTS.SERVER.UPDATE_GAME_DATA, gameData)
            }
        )
    })
}

export default socket
