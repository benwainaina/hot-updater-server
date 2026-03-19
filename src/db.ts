import { MongoClient } from "mongodb";

require("dotenv").config();

export const client = new MongoClient(process.env.MONGODB_URI!);

await client.connect();
