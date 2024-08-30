import express from "express";
import * as controller from '../controllers/userProductController.js';
export const userProductRouter = express.Router();

// userProductRouter.post('/create', controller.createUserProductConnection);
userProductRouter.post('/', controller.getUserProducts);