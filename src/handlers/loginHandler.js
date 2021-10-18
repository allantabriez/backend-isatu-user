const AWS = require('aws-sdk');
const config = require('../db/aws_config');
const {loginParams} = require('../db/params/loginParams');
const {createToken} = require('../models/auth');
const {options, loginSchema} = require('../models/user');

AWS.config.update(config.aws_remote_config);
const docClient = new AWS.DynamoDB.DocumentClient();

const validateLoginHandler = async (req, _, next) => {
  const {error, value} = loginSchema.validate(req.body, options);
  if (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: false,
      message: error.details[0].message,
    });
    next(res);
    return;
  }
  req.body = value;
  next();
};

const doLoginHandler = async (req, res, next) => {
  const {email, password} = req.body;
  console.log(password);
  const params = loginParams(email);

  docClient.query(params, (err, data) => {
    if (err) next(err);
    const {Items} = data;
    if (Items.length === 0) {
      res.statusCode = 400;
      res.send({
        success: false,
        message: 'Email not found',
      });
    } else if (password !== Items[0].password) {
      res.statusCode = 400;
      res.send({
        success: false,
        message: 'Password incorrect',
      });
    } else {
      const token = createToken(Items[0].id);
      res.statusCode = 200;
      res.send({
        success: true,
        token,
        data: Items[0],
      });
    }
  });
};

module.exports = {validateLoginHandler, doLoginHandler};
