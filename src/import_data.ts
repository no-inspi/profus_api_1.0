import { Prisma, PrismaClient } from '@prisma/client'
import { readCSVFile, getColumnFromSchema } from './utils'

var express = require('express')
const router = express.Router();

const prisma = new PrismaClient()

router.post('/insert_item_type', async (req: any, res: any) => {
    let result: Array<any>;
    result = await readCSVFile("../../data/item_type.csv")
    let uploaded_record = 0
    for (let i = 0; i < result.length; i++) {
        let json_to_push = {
            id: Number(result[i].id),
            name_en: result[i].name_en,
            name_es: result[i].name_es,
            name_fr: result[i].name_fr,
            name_de: result[i].name_de,
            name_pt: result[i].name_pt,
            name_it: result[i].name_it,
            super_type: Number(result[i].super_type),
            category: Number(result[i].category),
        }

        let item_type_count = await prisma.item_type.count(
            {
                where: json_to_push
            }
        )

        if (item_type_count == 0) {
            const item_type = await prisma.item_type.create({
                data: json_to_push
            })
            uploaded_record += 1
        }
    }
    // console.log(await readCSVFile("../../data/item_type.csv"))
    res.json({ "status": "finished", "uploaded record": uploaded_record })
})

router.post('/insert_item', async (req: any, res: any) => {
    let result: Array<any>;
    result = await readCSVFile("../../data/item.csv")
    let uploaded_record = 0
    

    var item_schema = getColumnFromSchema("Item")
    console.log(item_schema)

    for (let k = 0; k < result.length; k++) {
        var obj_item: { [k: string]: any } = {};
        for (let i = 0; i < item_schema.length; i++) {
            
            if (item_schema[i][1]=='Int' || item_schema[i][1]=='Float') {
                
                obj_item[item_schema[i][0]] = Number(result[k][item_schema[i][0]]);
            }
            else if (item_schema[i][1]=='String') {
                obj_item[item_schema[i][0]] = result[k][item_schema[i][0]];
            }
            
        }
        // console.log(obj_item)
        let item_count = await prisma.item.count(
            {
                where: obj_item
            }
        )

        if (item_count == 0) {
            const item_tmp = await prisma.item.create({
                data: obj_item as any
            })
            uploaded_record += 1
            console.log('uploaded num : '+k)
        }
    }

    res.json({ "status": "finished", "uploaded record": uploaded_record })
})

router.post('/insert_weapon', async (req: any, res: any) => {
    let result: Array<any>;
    result = await readCSVFile("../../data/weapon.csv")
    let uploaded_record = 0
    

    var item_schema = getColumnFromSchema("Weapon")
    console.log(item_schema)

    for (let k = 0; k < result.length; k++) {
        var obj_item: { [k: string]: any } = {};
        for (let i = 0; i < item_schema.length; i++) {
            
            if (item_schema[i][1]=='Int' || item_schema[i][1]=='Float') {
                
                obj_item[item_schema[i][0]] = Number(result[k][item_schema[i][0]]);
            }
            else if (item_schema[i][1]=='String') {
                obj_item[item_schema[i][0]] = result[k][item_schema[i][0]];
            }
            
        }
        obj_item['id'] = k+1
        // console.log(obj_item)
        let weapon_count = await prisma.weapon.count(
            {
                where: obj_item
            }
        )

        if (weapon_count == 0) {
            const weapon_tmp = await prisma.weapon.create({
                data: obj_item as any
            })
            uploaded_record += 1
            console.log('uploaded num : '+k)
        }
    }

    res.json({ "status": "finished", "uploaded record": uploaded_record })
})


module.exports = router;