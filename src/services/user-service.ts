import { getDB } from "../database/db"

export const addUser = async (name: string) => {
  const db = getDB()
  const user = await db.run("INSERT INTO users (name) VALUES (?)", [name])
  return user
}
