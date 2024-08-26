import * as model from '../models/translationModel.js';


export const createRecord = (req, res) => {
    const { productID, language, translation, original } = req.body;
    console.log('body', req.body)
    const insert = {
        product_id: productID,
        language_id: language,
        translation,
        original: original && original === 'on' ? true : false
    }
    model.insertRecord(insert)
        .then(result => res.json(
            { status: 'success', data: result }
        ));
}

export const updateTranslation = (req, res) => {
    const { translation_id, product_id, language_id, translation, original } = req.body
    const update = {
        translation_id,
        product_id,
        language_id,
        translation,
        original
    }
    model.updateTranslation(update)
    .then(result => res.json(result))
    
}