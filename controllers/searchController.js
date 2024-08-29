import * as productModel from '../models/productModel.js';

export const searchRecord = async (req, res) => {
    const query = req.params.query
    const result = await productModel.searchRecord(query)
    result.forEach(element => element.picture = element.picture.toString())
    res.json(result)
}