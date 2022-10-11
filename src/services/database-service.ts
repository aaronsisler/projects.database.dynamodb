import {
  DynamoDBClient,
  ExecuteStatementCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
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

const query = async (category: string): Promise<Transaction[]> => {
  const params = {
    KeyConditionExpression: "partitionKey = :partitionKey",
    FilterExpression: "contains (category, :category)",
    ExpressionAttributeValues: {
      ":partitionKey": { S: "1" },
      ":category": { S: category },
    },
    TableName: TABLE_NAME,
  };

  const { Items } = await ddbDocClient.send(new QueryCommand(params));

  const transactions: Transaction[] = Object.assign([], Items);

  return transactions;
};

const queryPartiql = async (category: string): Promise<Transaction[]> => {
  const partiQlParams = {
    Statement: "SELECT * FROM " + TABLE_NAME + " where category=?",
    Parameters: [{ S: category }],
  };
  const { Items } = await ddbDocClient.send(
    new ExecuteStatementCommand(partiQlParams)
  );

  const transactions: Transaction[] = Object.assign([], Items);

  return transactions;
};

export { create, get, query, queryPartiql };

// Call using full client.
// ddbDocClient.destroy(); // no-op
// client.destroy(); // destroys DynamoDBClient
