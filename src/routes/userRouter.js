import { Router } from "express";
import {
    getTransfers,
    getUser,
    postTransfer,
} from "../controllers/userController.js";
import authentication from "../middleware/authentication.js";
import { transferValidation } from "../middleware/validation.js";

const userRouter = Router();

userRouter.use(authentication);
userRouter.get("/user/", getUser);
userRouter.post("/transfer/", transferValidation, postTransfer);
userRouter.get("/transfer/", getTransfers);

export default userRouter;
