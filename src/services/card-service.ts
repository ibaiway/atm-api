import { getDB } from '../database/db'

export const addCard = async (
  accountId: number,
  name: string,
  number: string,
  enabledAt: string | null,
  pin: string
) => {
  const db = getDB()
  const card = await db.run(
    'INSERT INTO cards (account_id, name, number, enabled_at, pin) VALUES (?, ?, ?, ?, ?)',
    [accountId, name, number, enabledAt, pin]
  )
  return card
}

export const updateCardPin = async (cardNumber: string, pin: string) => {
  const db = getDB()
  const card = await db.run('UPDATE cards SET pin = ? WHERE number = ?', [
    pin,
    cardNumber
  ])
  return card
}

export const updateCardLimit = async (cardNumber: string, limit: number) => {
  const db = getDB()
  const card = await db.run('UPDATE cards SET limit = ? WHERE number = ?', [
    limit,
    cardNumber
  ])
  return card
}
