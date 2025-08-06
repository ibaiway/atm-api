import { Request, Response } from "express"
import { addAccount } from "../services/account-service"

export const createAccount = async (req: Request, res: Response) => {
  const account = await addAccount(req.body.userId, req.body.name)
  res.json(account).status(201)
}
