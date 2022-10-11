import express, { Application, Request, Response } from "express";

import { Transaction } from "./models";
import { get, query } from "./services/database-service";

const app: Application = express();

const port: number = 3001;

app.get("/toto", (_req: Request, res: Response) => {
  res.send("Hello toto");
});

interface PathParams {
  primaryKey?: string;
  secondaryKey?: string;
}

interface QueryParams {
  category?: string;
}

app.get(
  "/transactions/:primaryKey/:secondaryKey",
  async (req: Request, res: Response) => {
    const { primaryKey = "", secondaryKey = "" }: PathParams = ({} =
      req.params);
    const result: Transaction = await get(primaryKey, secondaryKey);

    res.send(result);
  }
);

app.get("/transactions", async (req: Request, res: Response) => {
  const { category = "" }: QueryParams = ({} = req.query);
  const results: Transaction[] = await query(category);

  res.send({ count: results.length, data: results });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port} !`);
});
