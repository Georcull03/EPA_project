import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { handler } from "../lib/lambdaHandler/get_index"

const ddbMock = mockClient(DynamoDBDocumentClient);

const question = [{
    level: "fourth",
    question: "BEEP_TEST_QUESTION",
    Answer: "BLAH",
    ManagerIC: "BLAH",
    Role: "fourth"
}]

const malformed_question = {}

const headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "OPTIONS, GET, POST , PUT, DELETE",
    'Access-Control-Allow-Headers': "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent"
};

const event = {
    "requestContext": {
        "httpMethod": "GET"
    }
}

beforeEach(() => {
    ddbMock.reset();
});

it ("shouldn't retrieve all questions from the DynamoDB", async () => {
    ddbMock.on(ScanCommand).resolves({
        Items: [malformed_question]
    });

    const response = await handler(event)

    expect(response.headers).toEqual(headers)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('[{}]')
})

it ("should return items from dynamoDB", async () => {
    ddbMock.on(ScanCommand).resolves({
        Items: question
    })

    const response = await handler(event)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(JSON.stringify(question))
    expect(response.headers).toStrictEqual(headers)
})
