import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { toNodeHandler } from "@hot-updater/server/node";
import { hotUpdater } from "./hotUpdater.js";
dotenv.config();
const app = express();
// log requests
app.use(morgan("dev"));
// Use the built-in JSON middleware to parse incoming JSON payloads
app.use(express.json());
app.all("/hot-updater/*name", toNodeHandler(hotUpdater));
app.listen(3000, "0.0.0.0");
