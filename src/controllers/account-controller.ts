import { Request, Response } from "express"
import { addAccount, getAccountsFromUser } from "../services/account-service"

export const createAccount = async (req: Request, res: Response) => {
  const account = await addAccount(req.body.userId, req.body.name)
  res.json(account).status(201)
}

export const getAccounts = async (req: Request, res: Response) => {
  const accounts = await getAccountsFromUser(req.body.userId) //This should be taken from auth

  res.json(accounts).status(200)
}
