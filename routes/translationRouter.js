import express from "express";
import * as controller from '../controllers/translationsController.js';
export const translationRouter = express.Router();

translationRouter.post('/', controller.createRecord);