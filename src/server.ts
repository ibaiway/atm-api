import express from "express"
import { createAccount, getAccounts } from "./controllers/account-controller"
import { createUser, getUsers } from "./controllers/user-controller"
import { initDB } from "./database/db"

await initDB()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.post("/accounts", createAccount)
app.get("/accounts", getAccounts)
app.post("/users", createUser)
app.get("/users", getUsers)

export default app
