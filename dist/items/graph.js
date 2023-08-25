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
router.get('/get_rune_price_per_d', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.id)
    if (req.query.id != "undefined") {
        const id = Number(req.query.id);
        const server_id = Number(req.query.server_id);
        const groupPrice = yield dbexport.runes_prices.groupBy({
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
        });
        res.json(groupPrice);
    }
}));
module.exports = router;
//# sourceMappingURL=graph.js.map