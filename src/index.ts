import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
const cors = require('cors');



// routes
var user = require('./user/user.routes')
var import_data = require('./import_data')
var item = require('./items/item')
var auth = require('./auth/auth.routes')

const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors());

// use routes
app.use('/users', user)
app.use('/data', import_data)
app.use('/items', item)
app.use('/auth', auth)

app.get('/', async (req, res) => {
  res.json({ "status": "working" })
})

app.get('/test', async (req, res) => {
  var array_columns = []
  let item_test = Prisma.dmmf.datamodel.models.find(model => model.name === "Item")
  // console.log("Account fields:", Prisma.dmmf.datamodel.models.find(model => model.name === "Item")?.fields.find(field => typeof field.relationFromFields != type[]))
  // console.log(item_test?.fields[0].relationName)

  if (item_test) {
    for (let i = 0; i < item_test.fields.length; i++) {
      let element = item_test.fields[i];
      if (typeof element.relationName === "undefined") {
        console.log(element)
        array_columns.push([element.name, element.type])
      }
    }
  }
  

  res.json(array_columns)
})

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001`),
)
