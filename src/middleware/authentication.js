import db from "../database.js";
import { tokenSchema } from "../helpers/schemas.js";

const authentication = async (req, res, next) => {
    let { authentication: token } = req.headers;
    const validation = tokenSchema.validate({ token });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }
    token = token.replace("Bearer", "").trim();
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        return res.status(401).send({ token: "Token inexistente" });
    }
    console.log(session);
    req.headers["userId"] = session.userId;
    next();
};

export default authentication;
