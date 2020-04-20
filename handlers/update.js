const AWS = require('aws-sdk');
const { validate } = require('../validation');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = async (event, context, callback) => {
  const { data, errors } = validate(JSON.parse(event.body));

  if (errors.length) {
    return callback(null, {
      statusCode: 400,
      message: 'Validation failed',
      body: JSON.stringify(errors),
    })
  }

  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      uuid: event.pathParameters.uuid,
    },
    ExpressionAttributeNames: {
      '#book_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':releaseDate': data.releaseDate,
      ':authorName': data.authorName,
    },
    UpdateExpression: 'SET #book_name = :name, releaseDate = :releaseDate, authorName = :authorName',
    ReturnValues: 'ALL_NEW',
  };

  let response;
  try {
    const dbRes = await dynamoDb.update(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify(dbRes.Attributes),
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong',
        error,
      })
    };
  }

  callback(null, response);
};