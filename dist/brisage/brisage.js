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
router.post('/get_brisage_data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let objectToExport = {
        stats: [],
        runesPrice: [],
        quantityWithFocus: [],
        quantityWithoutFocus: [],
        priceWithFocus: [],
        priceWithoutFocus: [],
        totalWithoutFocus: []
    };
    const id = Number(req.body.item_id);
    console.log("test begin");
    const item = yield dbexport.item.findMany({
        where: {
            id_: id,
        },
        select: {
            name_fr: true,
            desc_fr: true,
            level: true,
            price: true,
            item_effect: {
                where: {
                    item_id: id,
                    rune_item_id: { not: -100 }
                },
            }
        },
    });
    console.log("test begin 2");
    item[0].item_effect.forEach(function (value) {
        return __awaiter(this, void 0, void 0, function* () {
            let idExist = req.body.stats.find((i) => Number(i.id) === Number(value.rune_item_id));
            objectToExport.stats.push({
                "id_rune": idExist ? idExist.id.toString() : value.rune_item_id,
                "value": idExist ? Number(idExist.value) : median([value.min, value.max]),
                "power": value.power,
                "desc_fr": value.desc_fr,
                "level": item[0].level
            });
            let idRunes = Number(value.rune_item_id);
            const runes = yield dbexport.item.findUnique({
                where: {
                    id_: idRunes,
                    type_id: 78,
                },
                select: {
                    name_fr: true,
                    rune_price: {
                        where: {
                            item_id: idRunes,
                        },
                        orderBy: {
                            saved_date: "desc",
                        },
                        take: 1,
                    }
                },
            });
            let idExistRunePrice = req.body.runesPrice.find((i) => Number(i.id) === Number(runes ? runes.rune_price[0].item_id : 0));
            objectToExport.runesPrice.push({
                "id_rune": runes ? idExistRunePrice ? Number(idExistRunePrice.id) : runes.rune_price[0].item_id : 0,
                "price": runes ? idExistRunePrice ? Number(idExistRunePrice.value) : runes.rune_price[0].price : 0,
            });
        });
    });
    // jsp pourquoi ca marche mais ça permet de bien remplir le tableau des runes
    let runes = yield dbexport.item.findUnique({
        where: {
            id_: 11645,
            type_id: 78,
        },
        select: {
            name_fr: true,
            rune_price: {
                where: {
                    item_id: 11645,
                },
                orderBy: {
                    saved_date: "desc",
                },
                take: 1,
            }
        },
    });
    console.log("test begin 3");
    // /////////////////////////////////////////////////////////////////////////
    let [QuantitysansFocus, QuantityAvecFocus, PrixAvecFocus, PrixSansFocus, totalPrice] = calculBrisage(objectToExport.stats, objectToExport.runesPrice, req.body.taux);
    objectToExport.quantityWithFocus = QuantityAvecFocus;
    objectToExport.quantityWithoutFocus = QuantitysansFocus;
    objectToExport.priceWithFocus = PrixAvecFocus;
    objectToExport.priceWithoutFocus = PrixSansFocus;
    objectToExport.totalWithoutFocus = totalPrice;
    res.json(objectToExport);
}));
const median = (arr) => {
    const mid = Math.floor(arr.length / 2), nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
const calculBrisage = (stats, runePrice, taux) => {
    let totalWeight = 0;
    let QuantityAvecFocus = [];
    let QuantitysansFocus = [];
    let PrixAvecFocus = [];
    let PrixSansFocus = [];
    let WeightArray = [];
    let totalPrice = 0;
    for (let i = 0; i < stats.length; i++) {
        var calculPoidsLigne = ((3 * stats[i].value * stats[i].power * stats[i].level) / 200) + 1;
        // totalWeight+=calculPoidsLigne
        calculPoidsLigne >= 0 ? totalWeight += calculPoidsLigne : null;
        if (stats[i].desc_fr == "Vitalité" || stats[i].desc_fr == "Initiative" || stats[i].desc_fr == "Pods") {
            WeightArray.push({ "poids": 1, "poidsLigne": calculPoidsLigne });
        }
        else {
            WeightArray.push({ "poids": stats[i].power, "poidsLigne": calculPoidsLigne });
        }
    }
    for (let j = 0; j < WeightArray.length; j++) {
        var valueFocus = (WeightArray[j].poidsLigne + ((totalWeight - WeightArray[j].poidsLigne) / 2)) * taux / 100 / WeightArray[j].poids;
        var valueSansFocus = (WeightArray[j].poidsLigne) * taux / 100 / WeightArray[j].poids;
        QuantityAvecFocus.push(Math.floor(valueFocus));
        QuantitysansFocus.push(Math.floor(valueSansFocus));
        PrixAvecFocus.push(Math.abs(Math.floor(valueFocus * runePrice[j].price)));
        PrixSansFocus.push(Math.abs(Math.floor(valueSansFocus * runePrice[j].price)));
        totalPrice += Math.abs(Math.floor(valueSansFocus * runePrice[j].price));
    }
    return [QuantitysansFocus, QuantityAvecFocus, PrixAvecFocus, PrixSansFocus, totalPrice];
};
router.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let objectToExport = {
        stats: [],
        runesPrice: [],
        quantityWithFocus: [],
        quantityWithoutFocus: [],
        priceWithFocus: [],
        priceWithoutFocus: [],
        totalWithoutFocus: []
    };
    const id = Number(req.body.item_id);
    const item = yield dbexport.itemview.findUnique({
        where: {
            id_: id
        }
    });
    item.itemeffect.forEach((value) => {
        let idExist = req.body.stats.find((i) => Number(i.id) === Number(value.rune_item_id));
        objectToExport.stats.push({
            "id_rune": idExist ? idExist.id.toString() : value.rune_item_id,
            "value": idExist ? Number(idExist.value) : median([value.min, value.max]),
            "power": value.power,
            "desc_fr": value.desc_fr,
            "level": item.level
        });
        let idExistRunePrice = req.body.runesPrice.find((i) => Number(i.id) === Number(value.runePrice[0].item_id));
        objectToExport.runesPrice.push({
            "id_rune": idExistRunePrice ? Number(idExistRunePrice.id) : value.runePrice[0].item_id,
            "price": idExistRunePrice ? Number(idExistRunePrice.value) : value.runePrice[0].price,
        });
    });
    let [QuantitysansFocus, QuantityAvecFocus, PrixAvecFocus, PrixSansFocus, totalPrice] = calculBrisage(objectToExport.stats, objectToExport.runesPrice, req.body.taux);
    objectToExport.quantityWithFocus = QuantityAvecFocus;
    objectToExport.quantityWithoutFocus = QuantitysansFocus;
    objectToExport.priceWithFocus = PrixAvecFocus;
    objectToExport.priceWithoutFocus = PrixSansFocus;
    objectToExport.totalWithoutFocus = totalPrice;
    res.json(objectToExport);
}));
module.exports = router;
//# sourceMappingURL=brisage.js.map