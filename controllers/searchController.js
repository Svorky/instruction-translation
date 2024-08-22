import * as productModel from '../models/productModel.js';

export const searchRecord = async (req, res) => {
    const query = req.params.query
    productModel.searchRecord(query)
    .then( result => res.json(result))
}