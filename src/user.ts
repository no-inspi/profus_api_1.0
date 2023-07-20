import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

var express = require('express')
const router = express.Router();

const prisma = new PrismaClient()

router.get('/get_users', async (req: any, res: any) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

router.post('/add_user', async (req: any, res: any) => {
  const crypt_pwd = crypto.createHash('sha256').update('test').digest('hex');
  const user = await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      pseudo: 'Karma',
      password: crypt_pwd
    },
  })
  res.json({ "status": "user successfully added" })
})

module.exports = router;