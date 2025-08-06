import { Request, Response, NextFunction } from "express"
import { getDB } from "../database/db"

export const validateCardEnabled = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cardNumber = req.body.cardNumber
  const card = await getCard(cardNumber)
  if (!card) {
    return res.status(401).json({ message: "Card not enabled" })
  }
  next()
}

const getCard = async (cardNumber: string) => {
  const db = getDB()
  const card = await db.get(
    "SELECT * FROM cards WHERE number = ? AND enabled_at IS NOT NULL",
    [cardNumber]
  )
  return card
}
