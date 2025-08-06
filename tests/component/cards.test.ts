import request from "supertest"
import app from "../../src/server"
import { getDB, initDB } from "../../src/database/db"

beforeAll(async () => {
  await initDB()
})

beforeEach(async () => {
  await getDB().exec("DELETE FROM users;")
  await getDB().exec("DELETE FROM accounts;")
  await getDB().exec("DELETE FROM cards;")
  await getDB().exec("DELETE FROM transactions;")
})

describe("Cards", () => {
  it("should create a card", async () => {
    const response = await request(app).post("/cards").send({
      accountId: 1,
      name: "nameTest",
      number: "1234567890",
    })

    expect(response.status).toBe(201)
    expect(response.body.number).toBe("1234567890")
    expect(response.body.pin).toBeDefined()
  })

  it("should change a card pin", async () => {
    const createResponse = await request(app).post("/cards").send({
      accountId: 1,
      name: "nameTest",
      number: "1234567890",
    })

    const pin = createResponse.body.pin

    const updateResponse = await request(app).put("/cards/pin").send({
      number: "1234567890",
      pin: pin,
      newPin: "1234",
    })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.number).toBe("1234567890")
    expect(updateResponse.body.pin).toBe("1234")
  })
})
