/* eslint-disable new-cap */
const express = require('express');
const {refreshTokenHandler} = require('../handlers/authHandler');

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.route('/')
    .all((_, res, next) => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      next();
    })
    .get(refreshTokenHandler);

module.exports = {
  authRouter,
};
