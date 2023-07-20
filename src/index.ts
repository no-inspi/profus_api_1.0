import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import * as crypto from 'crypto';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  res.json({"status": "working"})
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  
  res.json(users)
})

app.post('/add_user', async (req, res) => {
  const crypt_pwd = crypto.createHash('sha256').update('test').digest('hex');
  const user = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      pseudo: 'Karma',
      password: crypt_pwd
    },
  })
  res.json({"status": "user successfully added"})
})



const server = app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
