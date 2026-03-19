import { createHotUpdater } from "@hot-updater/server";
import { mongoAdapter } from "@hot-updater/server/adapters/mongodb";
import { client } from "./db.js";

export const hotUpdater = createHotUpdater({
  database: mongoAdapter({ client }),
  storages: [],
  basePath: "/hot-updater",
});
