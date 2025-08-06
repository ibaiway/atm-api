import { Request, Response } from "express"
import { addCard } from "../services/card-service"

export const createCard = async (req: Request, res: Response) => {
  const number = req.body.number // TODO: this will need to be generated and checked for uniqueness

  const pin = "1111" // TODO: generete random pin and store hashed in db

  await addCard(req.body.accountId, req.body.name, number, null, pin)
  res.status(201).json({ number, pin })
}
