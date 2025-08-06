import {
  generateRandomPIN,
  hashPIN,
  comparePIN,
} from "../../src/utils/pin-utils"

describe("PIN Utils", () => {
  it("should generate a random PIN with default length", () => {
    const pin = generateRandomPIN()
    expect(pin).toHaveLength(4)
  })

  it("should generate a random PIN with custom length", () => {
    const pin = generateRandomPIN(6)
    expect(pin).toHaveLength(6)
  })

  it("should hash a PIN", async () => {
    const pin = "1234"
    const hashedPin = await hashPIN(pin)
    expect(hashedPin).not.toBe(pin)
  })

  it("should compare a PIN with a hashed PIN", async () => {
    const pin = "1234"
    const hashedPin = await hashPIN(pin)
    const result = await comparePIN(pin, hashedPin)
    expect(result).toBe(true)
  })
})
