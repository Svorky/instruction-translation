import { db } from "../config/db.js";

const TABLENAME = 'translations';
const TABLEFIELDS = ["id", "product_id", "language_id", "translation", 'original', "active", "date"];

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.integer('product_id').notNullable();
            t.integer('language_id').notNullable();
            t.text('translation').notNullable();
            t.boolean('original').defaultTo(false);
            t.boolean('active').notNullable().defaultTo(true);
            t.datetime('date').defaultTo(db.fn.now(6));;
        });
    }
});

export const insertRecord = async (args) => {
    const result = await db(TABLENAME)
        .insert(args)
        .returning('id');
    return result;
};

export const insertRecordTRX = async (trx, args) => {
    if(!trx) {
        const result = await db(TABLENAME)
            .insert(args)
            .returning('id');
        return result;
    }
    return await trx(TABLENAME)
        .insert(args)
        .returning('id');
};

export function getAllRecords() {
    return db(TABLENAME)
        .select(TABLEFIELDS)
        .orderBy("date", 'desc');
}

export const getTranslation = async (trx, productID) => {
    return await trx(TABLENAME)
        .select(TABLEFIELDS)
        .where({ product_id: productID, active: true });
};

export const updateTranslation = async (args) => {
    const trx = await db.transaction();
    try {

        const oldTranslation = await trx(TABLENAME)
            .update('active', false)
            .where({id: args.translation_id});
        const { translation_id, ...rest} = args
        
        const newTranslation = await insertRecordTRX(trx, rest);
        await trx.commit();
        return newTranslation;
    } catch(error) {
        console.error(error);
        await trx.rollback();
    }
};