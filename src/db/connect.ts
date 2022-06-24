import mongoose from "mongoose"

function connect() {
    const dbURI =
        process.env?.MONGO_URI || "mongodb://localhost:27017/chessProject"
    return mongoose
        .connect(dbURI)
        .then(() => console.log("Connected to DB"))
        .catch((e) => console.log("db error: " + e))
}

export default connect
