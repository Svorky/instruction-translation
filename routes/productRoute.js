import express from "express";
import * as controller from '../controllers/productController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
export const productRouter = express.Router();

productRouter.get('/', controller.getAllRecords);
productRouter.get('/id/:id',controller.getProductById)
productRouter.get('/last', controller.getLastProducts);
productRouter.post('/', verifyToken,controller.createRecord);
// productRouter.delete('/:id',controller.deleteRecord)