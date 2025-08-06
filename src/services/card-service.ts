import { getDB } from '../database/db'

export const addCard = async (
  accountId: number,
  name: string,
  number: string,
  enabledAt: string | null,
  pin: string,
  limit: number
) => {
  const db = getDB()
  const card = await db.run(
    'INSERT INTO cards (account_id, name, number, enabled_at, pin, card_limit) VALUES (?, ?, ?, ?, ?, ?)',
    [accountId, name, number, enabledAt, pin, limit]
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
  const card = await db.run(
    'UPDATE cards SET card_limit = ? WHERE number = ?',
    [limit, cardNumber]
  )
  return card
}

export const enableCardByNumber = async (cardNumber: string) => {
  const db = getDB()
  const card = await db.run(
    'UPDATE cards SET enabled_at = ? WHERE number = ?',
    [new Date().toISOString(), cardNumber]
  )
  return card
}
