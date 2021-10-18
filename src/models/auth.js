const jwt = require('jsonwebtoken');

const createToken = (id) => jwt.sign({
  id,
}, 'test', {expiresIn: '7d'});

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'test');
    return {decoded};
  } catch (err) {
    return {err};
  }
};

module.exports = {
  createToken,
  verifyToken,
};
