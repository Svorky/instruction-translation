import express from "express";
import * as controller from '../controllers/pictureController.js';
export const pictureRouter = express.Router();

pictureRouter.post('/add', controller.addPicture);