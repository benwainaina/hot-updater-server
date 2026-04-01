import { createHotUpdater } from "@hot-updater/server";
import { mongoAdapter } from "@hot-updater/server/adapters/mongodb";
import { client } from "./db.js";
import { s3Storage } from "@hot-updater/aws";
import dotenv from "dotenv";

dotenv.config();

console.log("lorem!");

export const hotUpdater = createHotUpdater({
  database: mongoAdapter({ client }),
  storages: [
    s3Storage({
      region: "auto",
      endpoint: process.env.CLOUD_FLARE_API_TOKEN || "",
      credentials: {
        accessKeyId: process.env.CLOUD_FLARE_ACCOUNT_ID || "",
        secretAccessKey: process.env.CLOUD_FLARE_SECRET_ACCESS_KEY || "",
      },
      bucketName: process.env.CLOUD_FLARE_BUCKET_NAME || "",
    }),
  ],
  basePath: "/hot-updater",
});
