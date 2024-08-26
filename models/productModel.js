import { db } from "../config/db.js";
import * as translationModel from './translationModel.js';
import * as languageModel from './languageModel.js';
import * as pictureModel from './pictureModel.js';

const TABLENAME = 'products';
const TABLEFIELDS = ["id", "title", "barcode", "date"];

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.string('title', 50).notNullable();
            t.string('barcode', 50).nullable();
            t.datetime('date').defaultTo(db.fn.now(6));;
        });
    }
});

export const insertRecord = async (args) => {
    let { title, language, translation, barcode, picture } = args;

    if(barcode === '') {
        barcode = null;
    }

    const trx = await db.transaction();
    try {

        const productID = await trx(TABLENAME)
            .insert({ title, barcode })
            .returning("id");

        await pictureModel.insertRecordTRX(trx, { product_id: productID[0].id, picture, active: true });

        const translationID = await translationModel.insertRecordTRX(trx,
            {
                product_id: productID[0].id,
                language_id: language,
                translation
            }
        );

        if(translationID) {
            await trx.commit();
            return productID;
        }
    } catch(error) {
        await trx.rollback();
        throw error;
    }

};

export function getAllRecords() {
    return db(TABLENAME)
        .select(TABLEFIELDS)
        .orderBy("date", 'desc');
}

export const getLastProducts = () => {
    return db(TABLENAME)
        .leftJoin('pictures', 'pictures.product_id', 'products.id')
        .select('products.id', 'products.title', 'products.date', 'pictures.picture', 'pictures.active')
        .where('pictures.active','=',true)
        .limit(5)
        .orderBy("date", 'desc');
};

export const getProduct = async (id) => {
    const trx = await db.transaction();
    try {
        const product = await trx(TABLENAME)
            .select(['id', 'title', 'barcode', 'date'])
            .where({ id: id });

        const { id: productID, title, barcode, date } = product[0];

        const picture = await trx('pictures')
            .select('picture')
            .where({ product_id: id })
            .andWhere({ active: true })
            .orderBy('date', 'desc')

        const obj = {
            title,
            picture: picture[0]?.picture?.toString(),
            date,
            translations: []
        };

        const translations = await translationModel.getTranslation(trx, productID);
        for(const translation of translations) {
            const { id: translationID, language_id, translation: translationText, date: translationDate, original } = translation;

            const language = await languageModel.getLanguage(trx, language_id);
            const languageName = language[0].name;

            obj.translations.push(
                {
                    id: translationID,
                    translation: translationText,
                    language_id,
                    language: languageName,
                    original
                }
            );
        }

        await trx.commit();

        return obj;
    } catch(error) {
        await trx.rollback();
        throw error;
    }
};

export const searchRecord = (query) => {
    return db(TABLENAME)
        .select('id', 'title', 'barcode', 'picture')
        .whereILike('title', `%${query}%`)
        .orWhereILike('barcode', `%${query}%`);
};