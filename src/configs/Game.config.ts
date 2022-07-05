import { type } from "os"

const PIECE = {
    // Pawns
    BP: "BP",
    WP: "WP",
    // Rooks
    BR: "BR",
    WR: "WR",
    // Knights
    BKn: "BKn",
    WKn: "WKn",
    // Bishops
    BB: "BB",
    WB: "WB",
    // Queen
    BQ: "BQ",
    WQ: "WQ",
    // King
    BK: "BK",
    WK: "WK",
}

interface IGameData {
    board: {
        [num: number]: string
    }
    turn: "W" | "B"
}

const gameInitialState: IGameData = {
    board: {
        // White side
        11: PIECE.WR,
        12: PIECE.WKn,
        13: PIECE.WB,
        14: PIECE.WQ,
        15: PIECE.WK,
        16: PIECE.WB,
        17: PIECE.WKn,
        18: PIECE.WR,
        //
        21: PIECE.WP,
        22: PIECE.WP,
        23: PIECE.WP,
        24: PIECE.WP,
        25: PIECE.WP,
        26: PIECE.WP,
        27: PIECE.WP,
        28: PIECE.WP,
        // Black side
        71: PIECE.BP,
        72: PIECE.BP,
        73: PIECE.BP,
        74: PIECE.BP,
        75: PIECE.BP,
        76: PIECE.BP,
        77: PIECE.BP,
        78: PIECE.BP,
        //
        81: PIECE.BR,
        82: PIECE.BKn,
        83: PIECE.BB,
        84: PIECE.BQ,
        85: PIECE.BK,
        86: PIECE.BB,
        87: PIECE.BKn,
        88: PIECE.BR,
    },
    turn: "B",
}

export type { IGameData }
export { gameInitialState, PIECE }
