import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import {
    signUpValidation,
    signInValidation,
} from "../middleware/validation.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpValidation, signUp);
authRouter.post("/sign-in", signInValidation, signIn);

export default authRouter;
