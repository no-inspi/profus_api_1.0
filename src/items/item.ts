import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

const { dbexport } = require('../utils/db');

const { isAuthenticated } = require('../middlewares');

var express = require('express')
const router = express.Router();

// const prisma = new PrismaClient()

router.get('/get_all_item', isAuthenticated, async (req: any, res: any) => {
    const item = await dbexport.item_type.findMany({
        where: {
            category: 0,
            super_type: { lte: 11 },
        },
        select: {
            // name_fr: true,
            id: true,
            item: {
                select: {
                    id: true,
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


router.get('/get_item_filter', isAuthenticated, async (req: any, res: any) => {

    const item = await dbexport.item_type.findMany({
        where: {
            category: 0,
            super_type: { lte: 11 },
        },
        select: {
            // name_fr: true,
            item: {
                where: {
                    name_fr: {
                        contains: req.query.contains,
                        mode: 'insensitive',
                    }
                },
                select: {
                    id: true,
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

router.get('/item_effect', async (req: any, res: any) => {
    console.log(req.query.id)
    if (req.query.id != "undefined") {


        const id = Number(req.query.id)
        const item = await dbexport.item.findMany({

            where: {
                id: id,
            },
            select: {
                name_fr: true,
                desc_fr: true,
                level: true,
                price: true,
                item_effect: {
                    where: {
                        item_id: id,
                        rune_item_id: { not: null }
                    },
                }
            },
        })

        // const item = await dbexport.item_effect.findMany({
        //     where: {
        //         item_id: 44
        //     }
        // })
        // console.log(item[0])
        res.json(item[0])
    }
})

router.get('/item_price', async (req: any, res: any) => {
    console.log(req.query.id)
    if (req.query.id != "undefined") {


        const id = Number(req.query.id)
        const item = await dbexport.item.findUnique({
            where: {
                id: id,
            },
            select: {
                name_fr: true,
                desc_fr: true,
                level: true,
                price: true,
                item_price: {
                    where: {
                        id_item: id,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                }
            },
        })
        res.json(item)
    }
})

router.get('/rune_price', async (req: any, res: any) => {
    // console.log(req.query.id)
    if (req.query.id != "undefined") {

        const id = Number(req.query.id)
        const runes = await dbexport.item.findUnique({
            where: {
                id: id,
                type_id: 78,
            },
            select: {
                rune_price: {
                    where: {
                        item_id: id,
                    },
                    orderBy: {
                        saved_date: "desc",
                    },
                    take: 1,
                }
            },
        })
        // const item = await dbexport.item.findMany({

        //     where: {
        //         id: id,
        //     },
        //     select: {
        //         name_fr: true,
        //         desc_fr: true,
        //         level: true,
        //         price: true,
        //         item_effect: {
        //             where: {
        //                 item_id: id,
        //                 rune_item_id: {not: null}
        //             },
        //         }
        //     },
        // })
        console.log(runes.rune_price[0])
        res.json({ "price": runes.rune_price[0].price })
    }
})

router.get('/item_taux', async (req: any, res: any) => {
    // console.log(req.query.id)
    if (req.query.id != "undefined") {

        const id = Number(req.query.id)
        const runes = await dbexport.item.findUnique({
            where: {
                id: id,
            },
            select: {
                taux_item: {
                    where: {
                        id_item: id,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                }
            },
        })
        // console.log(runes.rune_price[0])
        res.json(runes.taux_item)
    }
})

router.get('/add_item_taux', async (req: any, res: any) => {
    // console.log(req.query.id)
    console.log(req.query)
    if (req.query.id != "undefined") {

        const id = Number(req.query.id)
        const taux = await dbexport.TauxItemBrisage.create({
            data: {
                id_item: Number(req.query.id),
                taux: Number(req.query.taux),
                id_server: Number(req.query.serverid)
            }
        })
        res.json(taux)
    }
})

router.get('/get_item_taux', async (req: any, res: any) => {
    // console.log(req.query.id)
    console.log(req.query)
    if (req.query.id != "undefined") {
        const id = Number(req.query.id)
        const runes = await dbexport.item.findUnique({
            where: {
                id: id,
            },
            select: {
                taux_item: {
                    where: {
                        id_item: id,
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                }
            },
        })
        res.json(runes.taux_item)
    }
})

router.get('/get_rune_price', async (req: any, res: any) => {
    // console.log(req.query.id)
    console.log(req.query)
    if (req.query.id != "undefined") {
        const id = Number(req.query.id)
        const runes = await dbexport.item.findUnique({
            where: {
                id: id,
            },
            select: {
                name_fr: true,
                rune_price: {
                    where: {
                        item_id: id,
                    },
                    orderBy: {
                        saved_date: "asc",
                    },
                }
            },
        })
        res.json(runes)
    }
})




module.exports = router;