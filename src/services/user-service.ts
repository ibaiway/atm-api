import { getDB } from "../database/db"

export const addUser = async (name: string) => {
  const db = getDB()
  const user = await db.run("INSERT INTO users (name) VALUES (?)", [name])
  return user
}

export const getAllUsers = async () => {
  const db = getDB()
  const users = await db.all("SELECT * FROM users")
  return users
}
