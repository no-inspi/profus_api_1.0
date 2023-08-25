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
const utils_1 = require("./utils");
var express = require('express');
const router = express.Router();
const { db } = require('./utils/db');
router.post('/insert_item_type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield (0, utils_1.readCSVFile)("../../data/item_type.csv");
    let uploaded_record = 0;
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
        };
        let item_type_count = yield db.item_type.count({
            where: json_to_push
        });
        if (item_type_count == 0) {
            const item_type = yield db.item_type.create({
                data: json_to_push
            });
            uploaded_record += 1;
        }
    }
    // console.log(await readCSVFile("../../data/item_type.csv"))
    res.json({ "status": "finished", "uploaded record": uploaded_record });
}));
router.post('/insert_item', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield (0, utils_1.readCSVFile)("../../data/item.csv");
    let uploaded_record = 0;
    var item_schema = (0, utils_1.getColumnFromSchema)("Item");
    console.log(item_schema);
    for (let k = 0; k < result.length; k++) {
        var obj_item = {};
        for (let i = 0; i < item_schema.length; i++) {
            if (item_schema[i][1] == 'Int' || item_schema[i][1] == 'Float') {
                obj_item[item_schema[i][0]] = Number(result[k][item_schema[i][0]]);
            }
            else if (item_schema[i][1] == 'String') {
                obj_item[item_schema[i][0]] = result[k][item_schema[i][0]];
            }
        }
        // console.log(obj_item)
        let item_count = yield db.item.count({
            where: obj_item
        });
        if (item_count == 0) {
            const item_tmp = yield db.item.create({
                data: obj_item
            });
            uploaded_record += 1;
            console.log('uploaded num : ' + k);
        }
    }
    res.json({ "status": "finished", "uploaded record": uploaded_record });
}));
router.post('/insert_weapon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield (0, utils_1.readCSVFile)("../../data/weapon.csv");
    let uploaded_record = 0;
    var item_schema = (0, utils_1.getColumnFromSchema)("Weapon");
    console.log(item_schema);
    for (let k = 0; k < result.length; k++) {
        var obj_item = {};
        for (let i = 0; i < item_schema.length; i++) {
            if (item_schema[i][1] == 'Int' || item_schema[i][1] == 'Float') {
                obj_item[item_schema[i][0]] = Number(result[k][item_schema[i][0]]);
            }
            else if (item_schema[i][1] == 'String') {
                obj_item[item_schema[i][0]] = result[k][item_schema[i][0]];
            }
        }
        obj_item['id'] = k + 1;
        // console.log(obj_item)
        let weapon_count = yield db.weapon.count({
            where: obj_item
        });
        if (weapon_count == 0) {
            const weapon_tmp = yield db.weapon.create({
                data: obj_item
            });
            uploaded_record += 1;
            console.log('uploaded num : ' + k);
        }
    }
    res.json({ "status": "finished", "uploaded record": uploaded_record });
}));
module.exports = router;
//# sourceMappingURL=import_data.js.map