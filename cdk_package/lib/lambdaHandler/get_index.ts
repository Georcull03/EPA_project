import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
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

const dnsStage = process.env.DNS_STAGE ? process.env.DNS_STAGE : "";

export const handler = async (event: { requestContext: any; }) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json",
    };
    console.log(event)

    // switch(event.routeKey)
    // switch (event.requestContext.httpMethod)

    try {
        switch (event.requestContext.httpMethod) {
            case "GET":
                console.log('its a GET method');
                body = await dynamo.send(
                    new ScanCommand({TableName: tableName})
                );
                body = body.Items;
                break;
            default:
                throw new Error(`Unsupported route: "${event.requestContext.httpMethod}"`);
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