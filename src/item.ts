import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

var express = require('express')
const router = express.Router();

const prisma = new PrismaClient()

router.get('/get_item', async (req: any, res: any) => {
    const item = await prisma.item_type.findMany({
        where: {
            category: 0,
            super_type: {lte: 11},
        },
        select: {
            name_fr: true,
            item: {
                select: {
                    name_fr: true,
                }
            }
        },
    })

    res.json(item)
})

module.exports = router;