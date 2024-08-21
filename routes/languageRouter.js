import express from "express";
import * as controller from '../controllers/languageController.js';
export const languageRouter = express.Router();

languageRouter.get('/', controller.getAllRecords);
// productRouter.get('/:id',controller.getRecordById)
// productRouter.get('/', controller.getAllRecordsByType);
// languageRouter.post('/', controller.createRecord);
// productRouter.delete('/:id',controller.deleteRecord)