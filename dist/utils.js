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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnFromSchema = exports.readCSVFile = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const client_1 = require("@prisma/client");
function readCSVFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        return new Promise((resolve, reject) => {
            fs_1.default.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    });
}
exports.readCSVFile = readCSVFile;
function getColumnFromSchema(schema) {
    var array_columns = [];
    let item_test = client_1.Prisma.dmmf.datamodel.models.find(model => model.name === schema);
    // console.log("Account fields:", Prisma.dmmf.datamodel.models.find(model => model.name === "Item")?.fields.find(field => typeof field.relationFromFields != type[]))
    // console.log(item_test?.fields[0].relationName)
    if (item_test) {
        for (let i = 0; i < item_test.fields.length; i++) {
            let element = item_test.fields[i];
            // console.log(element=="undefined" ? item_test.fields[i] : element)
            if (typeof element.relationName === "undefined") {
                array_columns.push([element.name, element.type]);
            }
        }
    }
    return array_columns;
}
exports.getColumnFromSchema = getColumnFromSchema;
//# sourceMappingURL=utils.js.map