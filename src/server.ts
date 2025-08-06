import express from 'express'
import { createAccount, getAccounts } from './controllers/account-controller'
import { changeCardPin, createCard } from './controllers/card-controller'
import { createUser, getUsers } from './controllers/user-controller'
import { initDB } from './database/db'
import { validateCardEnabled } from './middlewares/cardenabled-middleware'
import { validatePin } from './middlewares/pin-middleware'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/accounts', createAccount)
app.get('/accounts', validatePin, validateCardEnabled, getAccounts)
app.post('/users', createUser)
app.get('/users', getUsers)
app.post('/cards', createCard)
app.put('/cards/:cardNumber/pin', validatePin, changeCardPin)

export default app
