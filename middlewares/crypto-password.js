const crypto = require('crypto');

exports.crypto = ({ requestType, secret }) => (request, response, next) => {
  const cryptoPassword = crypto.createHmac('sha256', secret)
    .update(request[requestType].password)
    .digest('hex');

  request[requestType].password = cryptoPassword;

  return next();
};
