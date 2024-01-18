import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { handler } from "../lib/lambdaHandler/put_index"

const ddbMock = mockClient(DynamoDBDocumentClient);

const question = {
    question: "BEEP_TEST_QUESTION",
    level: "fourth",
    job_role: "fourth",
    question_type: "BLAH",
    answer: "BLAH"
}

const malformed_question = {
    questions: "BEEP_TEST_QUESTION",
    levels: "fourth",
    job_roles: "fourth",
    question_types: "BLAH",
}

const headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': "OPTIONS, GET, POST , PUT, DELETE",
    'Access-Control-Allow-Headers': "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent"
};

const event = {
    "requestContext": {
        "httpMethod": "PUT"
    },
    "body": JSON.stringify(question)
}

const wrong_event = {
    "requestContext": {
        "httpMethod": "PUT"
    },
    "body": JSON.stringify(malformed_question)
}

beforeEach(() => {
    ddbMock.reset();
});

it ("can't put question into the DynamoDB", async () => {
    ddbMock.on(PutCommand).resolves({
        Attributes: malformed_question
    });

    const response = await handler(wrong_event)
    expect(response.statusCode).toBe(200)
    expect(response.headers).toEqual("")
    expect(response.body).toBe("\"Put item undefined\"")

})

it ("should put an item into the dynamoDB", async () => {
    ddbMock.on(PutCommand).resolves({
        Attributes: question
    })

    const response = await handler(event)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe("\"Put item BEEP_TEST_QUESTION\"")
})