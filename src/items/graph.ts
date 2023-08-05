import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

const { dbexport } = require('../utils/db');

const { isAuthenticated } = require('../middlewares');

var express = require('express')
const router = express.Router();

// const prisma = new PrismaClient()
router.get('/get_rune_price_per_d', async (req: any, res: any) => {
    // console.log(req.query.id)
    if (req.query.id != "undefined") {
        const id = Number(req.query.id)
        const server_id = Number(req.query.server_id)
        const groupPrice = await dbexport.runes_prices.groupBy({
            by: ['saved_date'],
            where: {
                item_id: id,
                server_id: server_id,
            },
            orderBy: {
                saved_date: "asc",
            },
            _avg: {
                price: true,
            },
        })
        res.json(groupPrice)
    }
})

module.exports = router;