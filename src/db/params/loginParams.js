const config = require('../aws_config');

const loginParams = (email) => {
  return {
    TableName: config.aws_table_name,
    KeyConditionExpression: '#hashKey = :hashKey',
    FilterExpression: '#email = :email',
    ExpressionAttributeNames: {
      '#hashKey': 'collection',
      '#email': 'email',
    },
    ExpressionAttributeValues: {
      ':hashKey': 'accounts',
      ':email': email,
    },
  };
};

module.exports = {
  loginParams,
};
