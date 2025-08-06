import { initDB } from "./database/db"
import app from "./server"

await initDB("./dev.db")

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
