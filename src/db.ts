import { MongoClient, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);

const options: MongoClientOptions = {
  maxPoolSize: 10,
};

Object.keys(options).forEach(
  (key) =>
    options[key as keyof MongoClientOptions] === undefined &&
    delete options[key as keyof MongoClientOptions],
);

console.log("options", options);

export const client = new MongoClient(process.env.MONGODB_URI!, options);

await client.connect();
