import { compareValue, hashValue } from './hash'

export const generateRandomPIN = (length: number = 4): string => {
  const digits = '0123456789'
  let pin = ''
  for (let i = 0; i < length; i++) {
    pin += digits.charAt(Math.floor(Math.random() * digits.length))
  }
  return pin
}

export const hashPIN = async (pin: string): Promise<string> => {
  return await hashValue(pin)
}

export const comparePIN = async (
  pin: string,
  hash: string
): Promise<boolean> => {
  return await compareValue(pin, hash)
}
