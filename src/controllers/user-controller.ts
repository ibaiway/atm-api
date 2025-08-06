import { Request, Response } from "express"
import { addUser } from "../services/user-service"

export const createUser = async (req: Request, res: Response) => {
  const user = await addUser(req.body.name)
  res.status(201).json(user)
}
