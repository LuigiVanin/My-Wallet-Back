import { ObjectId } from "mongodb";
import db from "../database.js";

const getUser = async (req, res) => {
    const { userId } = req.headers;
    try {
        const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(userId) });

        delete user.password;
        delete user._id;
        return res.status(200).send(user);
    } catch (err) {
        console.log("Erro não esperado!", err);
        return res.sendStatus(500);
    }
};

const postTransfer = async (req, res) => {
    const { userId } = req.headers;
    console.log(userId);
    try {
        await db.collection("transfers").insertOne({
            ...req.body,
            userId: new ObjectId(userId),
            time: Date.now(),
        });
        return res.status(201).send({ message: "item criado" });
    } catch (err) {
        console.log("Erro não esperado!", err);
        return res.sendStatus(500);
    }
};

const getTransfers = async (req, res) => {
    const { userId } = req.headers;
    try {
        const transfers = await db
            .collection("transfers")
            .find({ userId: new ObjectId(userId) })
            .toArray();

        return res.status(200).send(
            transfers.map((transfer) => {
                delete transfer.userId;
                return transfer;
            })
        );
    } catch (err) {
        console.log("Erro não esperado!", err);
        return res.sendStatus(500);
    }
};

export { getUser, postTransfer, getTransfers };
