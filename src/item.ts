import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

var express = require('express')
const router = express.Router();

const prisma = new PrismaClient()

router.get('/get_all_item', async (req: any, res: any) => {
    const item = await prisma.item_type.findMany({
        where: {
            category: 0,
            super_type: {lte: 11},
        },
        select: {
            // name_fr: true,
            item: {
                select: {
                    name_fr: true,
                    desc_fr: true,
                    level: true,
                    price: true,
                },
                orderBy: {
                    level: 'asc',
                }
            }
        },
    })

    let array_to_export = []

    for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].item.length; j++) {
            array_to_export.push(item[i].item[j])
        }
        
    }

    res.json(array_to_export)
})


router.get('/get_item_filter', async (req: any, res: any) => {
    console.log(req.query.contains)
    
    const item = await prisma.item_type.findMany({
        where: {
            category: 0,
            super_type: {lte: 11},
        },
        select: {
            // name_fr: true,
            item: {
                where: {
                    name_fr: {
                        contains: req.query.contains
                    }
                },
                select: {
                    name_fr: true,
                    desc_fr: true,
                    level: true,
                    price: true,
                },
                orderBy: {
                    level: 'asc',
                }
            }
        },
    })

    let array_to_export = []

    for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].item.length; j++) {
            array_to_export.push(item[i].item[j])
        }
        
    }

    res.json(array_to_export)
})

module.exports = router;