const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteOne = async (event, context, callback) => {
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      uuid: event.pathParameters.uuid,
    },
  };

  let response;
  try {
    await dynamoDb.delete(params).promise();

    response = {
      statusCode: 204,
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong',
        error,
      })
    }
  }

  callback(null, response);
};