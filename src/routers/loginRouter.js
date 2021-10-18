/* eslint-disable new-cap */
const express = require('express');
const {validateLoginHandler,
  doLoginHandler} = require('../handlers/loginHandler');

const loginRouter = express.Router();
loginRouter.use(express.json());

loginRouter.route('/')
    .all((_, res, next) => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      next();
    })
    .post(validateLoginHandler, doLoginHandler);

module.exports = {
  loginRouter,
};
