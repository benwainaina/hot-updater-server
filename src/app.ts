import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { toNodeHandler } from "@hot-updater/server/node";
import { hotUpdater } from "./hotUpdater.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.all("/hot-updater/*name", toNodeHandler(hotUpdater));

app.listen(3000);
