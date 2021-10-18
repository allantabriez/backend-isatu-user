const AWS = require('aws-sdk');
const config = require('../utils/aws_config');

const createDocClient = () => {
  AWS.config.update(config.aws_remote_config);
  return new AWS.DynamoDB.DocumentClient();
};

module.exports = {createDocClient};
