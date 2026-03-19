import express, { Request, Response } from "express";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript and Express!");
});

app.listen(PORT, () => {
  console.log(
    `Server is running on [http://localhost:${PORT}](http://localhost:${PORT})`,
  );
});
