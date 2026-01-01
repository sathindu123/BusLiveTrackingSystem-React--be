import express = require("express")
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/authRouter";
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT
const MONGO_URI = process.env.MONGO_URI as string

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
)


app.use("/api/v1/auth", authRouter)


app.use('/', (req, res) => {
  res.send('backend server is running..!')
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected")
  })
  .catch((err) => {
    console.error(`DB connection fail: ${err}`)
    process.exit(1)
  })

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on ${SERVER_PORT}`)
})