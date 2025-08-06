import { Request, Response, NextFunction } from 'express'
import { comparePIN } from '../utils/pin-utils'
import { getDB } from '../database/db'

export const validatePin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pin = req.body.pin
  const hashedPin = await getHashedPin(req.body.number)

  const isValid = await comparePIN(pin, hashedPin)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid PIN' })
  }
  next()
}

const getHashedPin = async (cardNumber: number) => {
  const db = getDB()
  const card = await db.get('SELECT pin FROM cards WHERE number = ?', [
    cardNumber
  ])
  return card.pin
}
