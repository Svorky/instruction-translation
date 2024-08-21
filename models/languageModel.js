import { db } from "../config/db.js";

const TABLENAME = 'languages';
const TABLEFIELDS = ["id", "name"];

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.string('name', 50).notNullable();
        });
    }
});

export function insertRecord(args) {
    return db(TABLENAME)
        .insert(args)
        .returning(TABLEFIELDS);
}

export function getAllRecords() {
    const result = db(TABLENAME)
        .select(TABLEFIELDS)
        .orderBy("name");
    return result
}

export const getLanguage = async (trx, languageID) =>  {
    const result = await trx(TABLENAME)
        .select(TABLEFIELDS)
        .where({id: languageID})
    return result
}