import * as model from '../models/languageModel.js';


export const createRecord = async (req, res) => {
    const { title, language, translation, picture, barcode } = req.body;
    console.log('body', req.body)

    model.insertRecord({ title, language, translation, barcode })
        .then(result => res.json(result));
}

export function getAllRecords(req, res) {
    model.getAllRecords()
        .then(result => res.json(result));
}