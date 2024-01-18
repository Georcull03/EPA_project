import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
    GetCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "qwizgurus_interview_table";

const dnsStage = process.env.DNS_STAGE ? process.env.DNS_STAGE : "";

export const handler = async (event: { requestContext: any; body: any; routeKey?: any; }) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "OPTIONS, GET, POST , PUT, DELETE",
        'Access-Control-Allow-Headers': "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent"
    };
    console.log(event)

    try {
        switch(event.requestContext.httpMethod) {
            case "OPTIONS":
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS, PUT",
                        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
                    },
                    body: JSON.stringify({ message: "OPTIONS request handled successfully" }),
                };
            case "PUT":
                let requestJSON = JSON.parse(event.body);
                await dynamo.send(
                    new PutCommand({
                        TableName: tableName,
                        Item: {
                            level: requestJSON.level,
                            question: requestJSON.question,
                            Answer: requestJSON.Answer,
                            ManagerIC: requestJSON.ManagerIC,
                            Role: requestJSON.Role,
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
        // @ts-ignore
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