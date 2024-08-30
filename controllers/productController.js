import * as model from '../models/productModel.js';

export const createRecord = async (req, res) => {
    const { user, title, language, translation, pictureString, barcode } = req.body;

    model.insertRecord({ user, title, language, translation, barcode, picture: pictureString })
        .then(result => {
            res.status(200).json({
                status: "success",
                data: result
            }
            );
        })
        .catch(error => res.status(400).json(error));
};

export function getAllRecords(req, res) {
    model.getAllRecords()
        .then(result => res.json(result));
}

export const getLastProducts = (req, res) => {
    model.getLastProducts()
        .then(result => {
            result.forEach((element) => { element.picture = element.picture?.toString(); });
            res.json(result);
        });
};

export const getProductById = (req, res) => {
    model.getProduct(req.params.id)
        .then(result => {
            res.json(result);
        });
};