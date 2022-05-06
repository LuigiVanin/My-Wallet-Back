import db from "../database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log({ name, email, password });
        const user = await db.collection("users").findOne({ email });
        if (user) {
            return res.sendStatus(409);
        }

        await db.collection("users").insertOne({
            name,
            email,
            password: bcrypt.hashSync(password, Number(process.env.KEY)),
        });
        return res.status(201).send({ message: "criado com sucesso" });
    } catch (err) {
        console.log("Erro não esperado!", err);
        return res.sendStatus(500);
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.sendStatus(404);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(401);
        }
        const session = await db
            .collection("sessions")
            .findOne({ userId: new ObjectId(user._id) });
        const token = uuid();
        await db.collection("sessions").insertOne({
            userId: new ObjectId(user._id),
            token,
            time: Date.now(),
        });
        delete user._id;
        delete user.password;
        return res.status(201).send({ token, ...user });
    } catch (err) {
        console.log("Erro não esperado!", err);
        return res.sendStatus(500);
    }
};

export { signUp, signIn };
