import { Request, Response } from 'express'
import { addUser, getAllUsers } from '../services/user-service'

export const createUser = async (req: Request, res: Response) => {
  const user = await addUser(req.body.name)
  res.status(201).json(user)
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers()
  res.status(200).json(users)
}
