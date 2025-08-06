import bcrypt from 'bcrypt'

export const hashValue = async (value: string) => {
  return await bcrypt.hash(value, 10)
}

export const compareValue = async (value: string, hash: string) => {
  return await bcrypt.compare(value, hash)
}
