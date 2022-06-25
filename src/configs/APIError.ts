import { HttpStatus } from "."

class APIError extends Error {
    message: string
    status: HttpStatus

    constructor(messsage: string, status: HttpStatus) {
        super()
        this.message = messsage
        this.status = status
    }
}

export default APIError
