import express, { Application, Request, Response } from "express";

import { Transaction } from "./models";
import { get } from "./services/database-service";

const app: Application = express();

const port: number = 3001;

app.get("/toto", (_req: Request, res: Response) => {
  res.send("Hello toto");
});

interface QueryParams {
  primaryKey?: string;
  secondaryKey?: string;
}

app.get(
  "/transactions/:primaryKey/:secondaryKey",
  async (req: Request, res: Response) => {
    const { primaryKey = "", secondaryKey = "" }: QueryParams = ({} =
      req.params);
    const result: Transaction = await get(primaryKey, secondaryKey);

    res.send(result);
  }
);

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
