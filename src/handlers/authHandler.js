const {verifyToken, createToken} = require('../models/auth');

const refreshTokenHandler = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.statusCode = 403;
    res.send({
      success: false,
      message: 'Token required!',
    });
    return;
  }

  const {error, decoded} = verifyToken(token);
  if (error) {
    res.statusCode = 401;
    res.send({
      success: false,
      message: 'Unauthenticated, token invalid',
    });
    return;
  }
  const newToken = createToken(decoded.id);
  res.statusCode = 200;
  res.send({
    success: true,
    token: newToken,
  });
  next();
};

const validateTokenHandler = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.statusCode = 403;
    res.send({
      success: false,
      message: 'Token required!',
    });
    return;
  }

  const {error} = verifyToken(token);
  if (error) {
    res.statusCode = 401;
    res.send({
      success: false,
      message: 'Unauthenticated, token invalid',
    });
    return;
  }
  next();
};

const getIdFromToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.statusCode = 403;
    res.send({
      success: false,
      message: 'Token required!',
    });
    return;
  }

  const {error} = verifyToken(token);
  if (error) {
    res.statusCode = 401;
    res.send({
      success: false,
      message: 'Unauthenticated, token invalid',
    });
    return;
  }
  req.body = {
    id: decoded.id,
  };
  next();
};

module.exports = {
  refreshTokenHandler,
  validateTokenHandler,
  getIdFromToken,
};
