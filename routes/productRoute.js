import express from "express";
import * as controller from '../controllers/productController.js';
export const productRouter = express.Router();

productRouter.get('/', controller.getAllRecords);
productRouter.get('/id/:id',controller.getProductById)
productRouter.get('/last', controller.getLastProducts);
productRouter.post('/', controller.createRecord);
// productRouter.delete('/:id',controller.deleteRecord)