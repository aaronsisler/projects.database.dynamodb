import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { LOCAL_DDB_ENDPOINT, TABLE_NAME } from "../config";
import { Transaction } from "../models";

// DynamoDB client creation
const ddbClient = new DynamoDBClient({ endpoint: LOCAL_DDB_ENDPOINT });
const ddbDocClient = DynamoDBDocument.from(ddbClient);

const create = async (): Promise<void> => {
  await ddbDocClient.put({
    TableName: TABLE_NAME,
    Item: {
      id: "2",
      content: "content from DynamoDBDocument",
    },
  });
};

const get = async (
  primaryKey: string,
  secondaryKey: string
): Promise<Transaction> => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      partitionKey: primaryKey,
      sortKey: secondaryKey,
    },
  };
  const { Item } = await ddbDocClient.get(params);

  const transaction: Transaction = Object.assign({}, Item);

  return transaction;
};

export { create, get };

// Call using full client.
// ddbDocClient.destroy(); // no-op
// client.destroy(); // destroys DynamoDBClient
