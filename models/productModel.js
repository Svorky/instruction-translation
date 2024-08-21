import { db } from "../config/db.js";
import * as translationModel from './translationModel.js'
import * as languageModel from './languageModel.js'

const TABLENAME = 'products';
const TABLEFIELDS = ["id", "title", "barcode", 'picture', "date"];

db.schema.hasTable(TABLENAME).then(function (exists) {
    if(!exists) {
        return db.schema.createTable(TABLENAME, function (t) {
            t.increments('id').primary();
            t.string('title', 50).notNullable();
            t.bigInteger('barcode').nullable();
            t.datetime('date').defaultTo(db.fn.now(6));;
            t.binary('picture');
        }); 
    }
});

export const insertRecord = async (args) => {
    let { title, language, translation, barcode } = args

    if(barcode === ''){
        barcode = null
    }

    const trx = await db.transaction();
    try {
        
        const productID = await trx(TABLENAME)
        .insert({title, barcode})
        .returning("id");
        const translationID = await translationModel.insertRecordTRX(trx,
            {
                product_id: productID[0].id,
                language_id: language,
                translation
            }
        )
        
        if(translationID){
            await trx.commit();
            return productID
        }
    } catch (error) {
        await trx.rollback();
        throw error;
    }

}

export function getAllRecords() {
    return db(TABLENAME)
        .select(TABLEFIELDS)
        .orderBy("date",'desc');
}

export const getLastProducts = () => {
    return db(TABLENAME)
        .select(['id', 'title', 'picture', 'date'])
        .limit(5)
        .orderBy("date",'desc');
}

export const getProduct = async (id) => {
    const trx = await db.transaction();
    try {
        const product = await trx(TABLENAME)
        .select(['id', 'title', 'picture', 'date'])
        .where({id: id});

        const {id: productID, title, picture, date} = product[0]
        const obj = {
            title,
            picture,
            date,
            translations: []
        }

        const translations = await translationModel.getTranslation(trx, productID)
        for(const translation of translations){
            const { id: translationID, language_id, translation: translationText, date: translationDate  } = translation
            
            const language = await languageModel.getLanguage(trx, language_id)
            const languageName = language[0].name

            obj.translations.push(
                {
                    id: translationID,
                    translation: translationText,
                    language: languageName
                }
            )
        }

        await trx.commit()

        return obj
    } catch (error) {
        await trx.rollback()
        throw error
    }
}