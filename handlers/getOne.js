const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getOne = async (event, context, callback) => {
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      uuid: event.pathParameters.uuid,
    },
  };

  let response;
  try {
    const dbRes = await dynamoDb.get(params).promise();

    if (dbRes.Item) {
      response = {
        statusCode: 200,
        body: JSON.stringify(dbRes.Item),
      };
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Book not found',
        }),
      }
    }
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong',
        error,
      }),
    }
  }

  callback(null, response);
};
