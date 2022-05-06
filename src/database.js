import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

await client.connect();

const db = client.db(process.env.DB);

export default db;
