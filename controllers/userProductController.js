import * as model from '../models/userProductModel.js';


export const createUserProductConnection = async (req, res) => {
    const { user_id, product_id } = req.body;
    console.log('body', req.body);

    model.createUserProduct(user_id, product_id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error));
};

export function getUserProducts(req, res) {
    const { user } = req.body
    model.getUserProducts(user)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error));
}