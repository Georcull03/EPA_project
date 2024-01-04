import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "qwizgurus_interview_table";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  console.log(event)
  
  // switch(event.routeKey)
  // switch (event.requestContext.httpMethod)

  try {
    switch(event.requestContext.httpMethod) {
        case "PUT":
            let requestJSON = JSON.parse(event.body);
            await dynamo.send(
              new PutCommand({
                TableName: tableName,
                Item: {
                  level: requestJSON.level,
                  question: requestJSON.question,
                  job_role: requestJSON.job_role,
                },
              })
            );
            body = `Put item ${requestJSON.question}`;
            break;
          default:
            throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};