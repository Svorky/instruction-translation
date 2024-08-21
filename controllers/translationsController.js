import * as model from '../models/translationModel.js';


export const createRecord = async (req, res) => {
    const { productID, language, translation } = req.body;
    console.log('body', req.body)
    const insert = {
        product_id: productID,
        language_id: language,
        translation
    }
    model.insertRecord(insert)
        .then(result => res.json(
            { status: 'success', data: result }
        ));
}