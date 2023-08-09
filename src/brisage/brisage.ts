import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto';

const { dbexport } = require('../utils/db');

const { isAuthenticated } = require('../middlewares');

var express = require('express')
const router = express.Router();

router.post('/get_brisage_data', async (req: any, res: any) => {

    type objectToExportType = {
        stats: any[],
        runesPrice: any[],
        quantityWithFocus: any[],
        quantityWithoutFocus: any[],
        priceWithFocus: any[],
        priceWithoutFocus: any[],
        totalWithoutFocus: any[]
    }

    let objectToExport: objectToExportType = {
        stats: [],
        runesPrice: [],
        quantityWithFocus: [],
        quantityWithoutFocus: [],
        priceWithFocus: [],
        priceWithoutFocus: [],
        totalWithoutFocus: []
    };

    const id = Number(req.body.item_id)
    console.log(id)
    const item = await dbexport.item.findMany({
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
    })

    item[0].item_effect.forEach(async function (value: any) {
        let idExist = req.body.stats.find((i: any) => Number(i.id) === Number(value.rune_item_id));
        objectToExport.stats.push(
            { "id_rune": idExist ? idExist.id.toString() : value.rune_item_id, 
            "value": idExist ? Number(idExist.value) : median([value.min, value.max]), 
            "power": value.power, 
            "desc_fr": value.desc_fr,
            "level": item[0].level 
        })

        let idRunes = Number(value.rune_item_id);
        const runes = await dbexport.item.findUnique({
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
        })
        let idExistRunePrice = req.body.runesPrice.find((i: any) => Number(i.id) === Number(runes ? runes.rune_price[0].item_id : 0));
        objectToExport.runesPrice.push({
            "id_rune": runes ? idExistRunePrice ? Number(idExistRunePrice.id) : runes.rune_price[0].item_id : 0,
            "price": runes ? idExistRunePrice ? Number(idExistRunePrice.value) : runes.rune_price[0].price : 0,
        })
    });
    // jsp pourquoi ca marche mais ça permet de bien remplir le tableau des runes
    let runes = await dbexport.item.findUnique({
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
    })
    // /////////////////////////////////////////////////////////////////////////
    let [QuantitysansFocus, QuantityAvecFocus, PrixAvecFocus, PrixSansFocus, totalPrice]: any = calculBrisage(objectToExport.stats, objectToExport.runesPrice, req.body.taux)
    objectToExport.quantityWithFocus = QuantityAvecFocus;
    objectToExport.quantityWithoutFocus = QuantitysansFocus;
    objectToExport.priceWithFocus = PrixAvecFocus;
    objectToExport.priceWithoutFocus = PrixSansFocus;
    objectToExport.totalWithoutFocus = totalPrice;

    res.json(objectToExport)
})

const median = (arr: any) => {
    const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const calculBrisage = (stats: any, runePrice: any, taux: any) => {
    let totalWeight = 0
    let QuantityAvecFocus = []
    let QuantitysansFocus = []
    let PrixAvecFocus = []
    let PrixSansFocus = []
    let WeightArray = []
    let totalPrice = 0

    for (let i = 0; i < stats.length; i++) {

        var calculPoidsLigne = ((3*stats[i].value*stats[i].power*stats[i].level)/200)+1

        // totalWeight+=calculPoidsLigne
        calculPoidsLigne>=0 ? totalWeight+=calculPoidsLigne : null;

        if (stats[i].desc_fr == "Vitalité" || stats[i].desc_fr == "Initiative" || stats[i].desc_fr == "Pods") {
            WeightArray.push({"poids": 1,"poidsLigne": calculPoidsLigne})
        }
        else {
            WeightArray.push({"poids": stats[i].power,"poidsLigne": calculPoidsLigne})
        }
    }
    console.log("weightArray: ", WeightArray, totalWeight)
    for (let j = 0; j < WeightArray.length; j++) {
        var valueFocus = (WeightArray[j].poidsLigne+((totalWeight-WeightArray[j].poidsLigne)/2))*taux/100/WeightArray[j].poids
        var valueSansFocus =(WeightArray[j].poidsLigne)*taux/100/WeightArray[j].poids

        QuantityAvecFocus.push(Math.floor(valueFocus))
        QuantitysansFocus.push(Math.floor(valueSansFocus))
        PrixAvecFocus.push(Math.abs(Math.floor(valueFocus*runePrice[j].price)))
        PrixSansFocus.push(Math.abs(Math.floor(valueSansFocus*runePrice[j].price)))
        totalPrice+=Math.abs(Math.floor(valueSansFocus*runePrice[j].price))
    }
    return [QuantitysansFocus, QuantityAvecFocus, PrixAvecFocus, PrixSansFocus, totalPrice]
    
}

module.exports = router;