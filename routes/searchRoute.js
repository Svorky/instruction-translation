import express from "express";
import * as controller from '../controllers/searchController.js';
export const searchRouter = express.Router();

searchRouter.get('/:query', controller.searchRecord);