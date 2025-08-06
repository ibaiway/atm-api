import { Request, Response } from 'express'
import {
  addCard,
  enableCardByNumber,
  updateCardLimit,
  updateCardPin
} from '../services/card-service'
import { generateRandomPIN, hashPIN } from '../utils/pin-utils'
import z from 'zod'

export const createCard = async (req: Request, res: Response) => {
  const number = req.body.number // TODO: this will need to be generated and checked for uniqueness

  const pin = generateRandomPIN()
  const hashedPin = await hashPIN(pin)

  await addCard(req.body.accountId, req.body.name, number, null, hashedPin, 0)
  res.status(201).json({ number, pin })
}

export const changeCardPin = async (req: Request, res: Response) => {
  const pin = req.body.newPin
  const cardNumber = req.params.cardNumber

  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required' })
  }

  const hashedPin = await hashPIN(pin)

  await updateCardPin(cardNumber, hashedPin)
  res.status(200).json({ number: cardNumber, pin })
}

const cardSchema = z.object({
  limit: z.number().min(500).max(6000),
  cardNumber: z.string({
    message: 'Card number is required as a path parameter'
  })
})

export const changeCardLimit = async (req: Request, res: Response) => {
  try {
    const cardValidatedData = cardSchema.parse({
      limit: req.body.limit,
      cardNumber: req.params.cardNumber
    })

    await updateCardLimit(cardValidatedData.cardNumber, cardValidatedData.limit)
    res.status(200).json({ message: 'Card limit updated successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }))
      res.status(400).json({
        error: 'Validation failed',
        details: formattedErrors
      })
    } else {
      throw error
    }
  }
}

export const enableCard = async (req: Request, res: Response) => {
  const cardNumber = req.params.cardNumber
  if (!cardNumber) {
    return res.status(400).json({ error: 'Card number is required' })
  }
  await enableCardByNumber(cardNumber)

  res.status(200).json({ message: 'Card enabled successfully' })
}
