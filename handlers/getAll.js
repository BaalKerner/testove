const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getAll = async (event, context, callback) => {
  const params = {
    TableName: process.env.BOOKS_TABLE,
  };

  let response;
  try {
    const dbRes = await dynamoDb.scan(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify({
        books: dbRes.Items,
      }),
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
