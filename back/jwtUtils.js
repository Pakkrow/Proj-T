const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secretKey = 'doNotTellAnyone'; // Replace with your own secret key
  const options = {
    expiresIn: '3M', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = {
  generateToken,
};