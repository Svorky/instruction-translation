import { db } from "../config/db.js";

const TABLENAME = 'pictures';
const TABLEFIELDS = ["id", 'product_id', "picture", 'approved', 'active', 'date'];

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.integer('product_id').notNullable();
            t.binary('picture').notNullable();
            t.boolean('approved').defaultTo(false);
            t.boolean('active').defaultTo(false);
            t.datetime('date').defaultTo(db.fn.now(6));
        });
    }
});

export const insertRecord = (args) => {
    return db(TABLENAME)
        .insert(args)
        .returning(['id','picture']);
}

export const insertRecordTRX = async (trx, args) => {
    return await trx(TABLENAME)
        .insert(args);
};
