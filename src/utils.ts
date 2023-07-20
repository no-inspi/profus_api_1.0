import fs from 'fs';
import csv from 'csv-parser';
import { Prisma, PrismaClient } from '@prisma/client'

export async function readCSVFile(filePath: string): Promise<object[]> {
    const results: object[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

export  function getColumnFromSchema(schema: string) {
    var array_columns = []
    let item_test = Prisma.dmmf.datamodel.models.find(model => model.name === schema)
    // console.log("Account fields:", Prisma.dmmf.datamodel.models.find(model => model.name === "Item")?.fields.find(field => typeof field.relationFromFields != type[]))
    // console.log(item_test?.fields[0].relationName)

    if (item_test) {
        for (let i = 0; i < item_test.fields.length; i++) {
            let element = item_test.fields[i];
            // console.log(element=="undefined" ? item_test.fields[i] : element)
            if (typeof element.relationName === "undefined") {
                array_columns.push([element.name, element.type])
            }
        }
    }

    return array_columns
}

