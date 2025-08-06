import { Request, Response } from 'express'
import { addCard, updateCardPin } from '../services/card-service'
import { generateRandomPIN, hashPIN } from '../utils/pin-utils'

export const createCard = async (req: Request, res: Response) => {
  const number = req.body.number // TODO: this will need to be generated and checked for uniqueness

  const pin = generateRandomPIN()
  const hashedPin = await hashPIN(pin)

  await addCard(req.body.accountId, req.body.name, number, null, hashedPin)
  res.status(201).json({ number, pin })
}

export const changeCardPin = async (req: Request, res: Response) => {
  const pin = req.body.newPin
  const cardNumber = req.params.cardNumber
  console.log('cardNumber', cardNumber)

  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required' })
  }
  console.log('cardNumber', cardNumber)

  const hashedPin = await hashPIN(pin)

  await updateCardPin(cardNumber, hashedPin)
  res.status(200).json({ number: cardNumber, pin })
}
