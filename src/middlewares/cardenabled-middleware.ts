import { Request, Response, NextFunction } from 'express'
import { getDB } from '../database/db'

export const validateCardEnabled = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cardNumber = req.params.cardNumber
  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required' })
  }
  const card = await getEnabledCard(cardNumber)
  if (!card?.enabled_at) {
    return res.status(401).json({ message: 'Card not enabled' })
  }
  next()
}

const getEnabledCard = async (cardNumber: string) => {
  const db = getDB()
  const card = await db.get(
    'SELECT * FROM cards WHERE number = ? AND enabled_at IS NOT NULL',
    [cardNumber]
  )
  return card
}
