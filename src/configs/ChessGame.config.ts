enum TURN {
    WHITE = "WHITE",
    BLACK = "BLACK",
}

enum PIECE {
    P1 = "Pawn_1",
    P8 = "Pawn_2",
    P2 = "Pawn_3",
    P3 = "Pawn_4",
    P4 = "Pawn_5",
    P5 = "Pawn_6",
    P6 = "Pawn_7",
    P7 = "Pawn_8",
    B1 = "Bishop_1",
    B2 = "Bishop_2",
    R1 = "Rook_1",
    R2 = "Rook_2",
    Q = "Queen",
    K = "King",
}

enum ROW {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
}

enum COL {
    _1,
    _2,
    _3,
    _4,
    _5,
    _6,
    _7,
    _8,
}

interface MOVE {
    piece: PIECE
    position: {
        row: ROW
        col: COL
    }
    attacked?: PIECE
}

export { TURN, PIECE, MOVE }
