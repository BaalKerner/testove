const uuid = require('uuid');
const AWS = require('aws-sdk');
const { validate } = require('../validation');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event, context, callback) => {
  const { data, errors } = validate(JSON.parse(event.body));

  if (errors.length) {
    return callback(null, {
      statusCode: 400,
      message: 'Validation failed',
      body: JSON.stringify(errors),
    })
  }

  const book = {
    uuid: uuid.v1(),
    name: data.name,
    releaseDate: data.releaseDate,
    authorName: data.authorName,
  };

  // I would also move all db request to db/ folder and perform db actions from there
  // but I don't want to do it now
  let response;
  try {
    await dynamoDb.put({
      TableName: process.env.BOOKS_TABLE,
      Item: book,
    }).promise();

    response = {
      statusCode: 201,
      body: JSON.stringify(book),
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
