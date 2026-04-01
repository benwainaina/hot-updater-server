import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);

export const client = new MongoClient(process.env.MONGODB_URI!);

await client.connect();
