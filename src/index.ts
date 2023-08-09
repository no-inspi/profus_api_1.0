import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
const cors = require('cors');



// routes
var user = require('./user/user.routes')
var import_data = require('./import_data')
var item = require('./items/item')
var auth = require('./auth/auth.routes')
var brisage = require('./brisage/brisage')
var graph = require('./items/graph')

const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors());
app.use(express.raw())

// use routes
app.use('/users', user)
app.use('/data', import_data)
app.use('/items', item)
app.use('/auth', auth)
app.use('/brisage', brisage)
app.use('/graph', graph)

app.get('/', async (req, res) => {
  res.json({ "status": "working" })
})

app.get('/test', async (req, res) => {
  const allUsers = await prisma.item.findMany({
    where: {
      id_: 44,
    },
    include: {
      item_effect: true,
    }
  })
  console.log(allUsers)
  res.json(allUsers)
})

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001`),
)
