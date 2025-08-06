import { getDB } from '../database/db'

export const addAccount = async (userId: number, name: string) => {
  const db = getDB()
  const account = await db.run(
    'INSERT INTO accounts (user_id, name, balance) VALUES (?, ?, ?)',
    [userId, name, 0]
  )
  return account
}

export const getAccountsFromUser = async (userId: number) => {
  const db = getDB()
  const accounts = await db.all('SELECT * FROM accounts WHERE user_id = ?', [
    userId
  ])
  return accounts
}
