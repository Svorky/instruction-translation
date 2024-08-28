import { Router } from "express";
const userRouter = Router();
import { registerUser, loginUser } from "../controllers/userController.js";
import { verifyToken } from '../middlewares/verifyToken.js';

// register route = register a new user
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get('/auth', verifyToken, (req,res)=>{
    res.sendStatus(201)
})
export default userRouter;
