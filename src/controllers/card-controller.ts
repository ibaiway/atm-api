import { Request, Response } from "express"
import { addCard } from "../services/card-service"
import { generateRandomPIN, hashPIN } from "../utils/pin-utils"

export const createCard = async (req: Request, res: Response) => {
  const number = req.body.number // TODO: this will need to be generated and checked for uniqueness

  const pin = generateRandomPIN()
  const hashedPin = await hashPIN(pin)

  await addCard(req.body.accountId, req.body.name, number, null, hashedPin)
  res.status(201).json({ number, pin })
}
