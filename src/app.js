import express, { json } from "express";
import db from "./database.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use(json());

app.get("/ping", async (req, res) => {
    console.log(await db.collection("users").find({}).toArray());
    res.status(200).send({ message: "pong" });
});
app.use(authRouter);
app.use(userRouter);

export default app;
