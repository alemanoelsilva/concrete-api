const {
  signIn,
  signUp,
  search,
} = require('../api/users/factory');

const {
  requestSignIn,
  requestSignUp,
  requestUser,
  requestToken,
} = require('../api/users/schemas');

const {
  requestValidation,
} = require('../middlewares/schema-validation');

const {
  crypto,
} = require('../middlewares/crypto-password');

const {
  crypto: { secret },
} = require('../config/environment');

module.exports = (app) => {
  app.post('/api/signin',
    requestValidation({ schema: requestSignIn, requestType: 'body' }),
    crypto({ secret, requestType: 'body' }),
    signIn);

  app.post('/api/signup',
    requestValidation({ schema: requestSignUp, requestType: 'body' }),
    crypto({ secret, requestType: 'body' }),
    signUp);

  app.get('/api/users/:id',
    requestValidation({ schema: requestUser, requestType: 'params' }),
    requestValidation({ schema: requestToken, requestType: 'headers' }),
    search);
};
