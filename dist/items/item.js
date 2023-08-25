"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dbexport } = require('../utils/db');
const { isAuthenticated } = require('../middlewares');
var express = require('express');
const router = express.Router();
// const prisma = new PrismaClient()
router.get('/get_all_item', isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield dbexport.item_type.findMany({
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
    });
    let array_to_export = [];
    for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].item.length; j++) {
            array_to_export.push(item[i].item[j]);
        }
    }
    res.json(array_to_export);
}));
router.get('/get_item_filter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield dbexport.item_type.findMany({
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
                    id_: true,
                    name_fr: true,
                    desc_fr: true,
                    level: true,
                    price: true,
                    item_effect: {
                        where: {
                            rune_item_id: { not: -100 }
                        },
                    }
                },
                orderBy: {
                    level: 'asc',
                }
            }
        },
    });
    let array_to_export = [];
    for (let i = 0; i < item.length; i++) {
        for (let j = 0; j < item[i].item.length; j++) {
            array_to_export.push(item[i].item[j]);
        }
    }
    res.json(array_to_export);
}));
router.get('/item_effect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.id);
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const item = yield dbexport.item.findMany({
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
        });
        // const item = await dbexport.item_effect.findMany({
        //     where: {
        //         item_id: 44
        //     }
        // })
        // console.log(item[0])
        res.json(item[0]);
    }
}));
router.get('/item_price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.id);
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const item = yield dbexport.item.findUnique({
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
        });
        res.json(item);
    }
}));
router.get('/rune_price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.id)
    console.log(req.query.id);
    if (req.query.id != "undefined" && req.query.id != "" && req.query.id != null) {
        const id = Number(req.query.id);
        const runes = yield dbexport.item.findUnique({
            where: {
                id_: id,
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
        });
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
        console.log(runes == "undefined");
        console.log(runes.rune_price[0]);
        res.json({ "price": runes.rune_price[0].price });
    }
    else {
        res.json({ "error": "no id" });
    }
}));
router.get('/item_taux', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const runes = yield dbexport.item.findUnique({
            where: {
                id_: id,
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
        });
        // console.log(runes.rune_price[0])
        res.json(runes.taux_item);
    }
}));
router.get('/add_item_taux', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.id)
    console.log(req.query);
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const taux = yield dbexport.TauxItemBrisage.create({
            data: {
                id_item: Number(req.query.id),
                taux: Number(req.query.taux),
                id_server: Number(req.query.serverid)
            }
        });
        res.json(taux);
    }
}));
router.get('/get_item_taux', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.id)
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const runes = yield dbexport.item.findUnique({
            where: {
                id_: id,
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
        });
        res.json(runes.taux_item);
    }
}));
router.get('/get_rune_price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.id)
    console.log(req.query);
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const runes = yield dbexport.item.findUnique({
            where: {
                id_: id,
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
        });
        res.json(runes);
    }
}));
router.post('/set_rune_price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.id)
    console.log(req.body);
    const lastrune = yield dbexport.runes_prices.findMany({
        orderBy: {
            saved_date: "desc",
        },
        take: 1
    });
    console.log(lastrune);
    let time = new Date(Date.now());
    if (req.body.id != "undefined") {
        const taux = yield dbexport.runes_prices.create({
            data: {
                id_: Number(lastrune[0].id_ + 1),
                id_intern: Number(lastrune[0].id_intern + 1),
                item_id: Number(req.body.id),
                price: Number(req.body.price),
                server_id: 36,
                user_id: 0,
                saved_date: time
            }
        });
        res.json(taux);
    }
}));
module.exports = router;
//# sourceMappingURL=item.js.map