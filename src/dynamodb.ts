import {
  AttributeValue,
  DynamoDB,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { EncodingServiceImpl } from "./encoding";
import { Order, OrderStatus, OrderTypes } from "./types";

const tableName = "Order";

const client = new DynamoDB({
  endpoint: "http://localhost:8000",
  region: "us-west-2",
  credentials: {
    accessKeyId: "local",
    secretAccessKey: "local",
  },
});

const encoding = new EncodingServiceImpl<Record<string, AttributeValue>>();

export const createTable = async () => {
  try {
    const data = await client.createTable({
      TableName: tableName,
      KeySchema: [
        { AttributeName: "PK", KeyType: "HASH" }, // Partition key
        { AttributeName: "SK", KeyType: "RANGE" }, // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "PK", AttributeType: "S" },
        { AttributeName: "SK", AttributeType: "S" },
        { AttributeName: "GSI1PK", AttributeType: "S" },
        { AttributeName: "GSI1SK", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: "GSI1",
          KeySchema: [
            { AttributeName: "GSI1PK", KeyType: "HASH" },
            { AttributeName: "GSI1SK", KeyType: "RANGE" },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      ],
    });
    console.log("Table created:");
  } catch (error) {
    console.error("Error creating table:");
  }
};

export const putItem = async (input: Order) => {
  try {
    await client.putItem({
      TableName: tableName,
      Item: marshall({
        PK: `ORDER#${input.id}`,
        SK: `${input.type}`,
        GSI1PK: `ORDER#${input.companyId}`,
        GSI1SK: `${input.type}#${input.name}`,
        Id: input.id,
        CompanyId: input.companyId,
        Name: input.name,
        UserId: input.userId,
        Status: input.status,
        Type: input.type,
      }),
    });
    console.log("Item inserted");
  } catch (error) {
    console.error("Error inserting item:", error);
  }
};

export const findByCompanyAndType = async ({
  companyId,
  type,
  name = "",
  limit = 2,
  offset,
}: {
  companyId: string;
  type: OrderTypes;
  name?: string;
  limit?: number;
  offset?: string;
}) => {
  const request: QueryCommandInput = {
    TableName: tableName,
    IndexName: "GSI1",
    Limit: limit,
    KeyConditionExpression: "GSI1PK = :gsi1pk AND begins_with(GSI1SK, :gsi1sk)",
    FilterExpression: "#status = :status",
    ExpressionAttributeValues: {
      ":gsi1pk": { S: `ORDER#${companyId}` },
      ":gsi1sk": { S: `${type}#${name}` },
      ":status": { S: OrderStatus.OPEN },
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ScanIndexForward: false,
  };

  if (name) {
    request.KeyConditionExpression = "GSI1PK = :gsi1pk AND GSI1SK = :gsi1sk";
  }

  let lastEvaluatedKey = offset ? encoding.decode(offset) : null;

  if (lastEvaluatedKey) {
    request.ExclusiveStartKey = lastEvaluatedKey;
  }

  const items: Order[] = [];

  do {
    if (lastEvaluatedKey) {
      request.ExclusiveStartKey = lastEvaluatedKey;
    }

    const command = new QueryCommand(request);

    const { Items, LastEvaluatedKey } = await client.send(command);

    lastEvaluatedKey = LastEvaluatedKey || null;

    Items?.forEach((item, idx) => {
      const tokenItem = unmarshall(item);

      if (items.length < limit) {
        items.push(tokenItem as Order);

        if (items.length === limit && idx < Items.length - 1) {
          const keys = {
            GSI1PK: Items[idx].GSI1PK,
            GSI1SK: Items[idx].GSI1SK,
            PK: Items[idx].PK,
            SK: Items[idx].SK,
          };

          lastEvaluatedKey = keys;
        }
      }
    });
  } while (items.length < limit && lastEvaluatedKey);

  const nextPageStartKeyEncoded = lastEvaluatedKey
    ? encoding.encode(lastEvaluatedKey)
    : undefined;

  return { items, offset: nextPageStartKeyEncoded };
};
