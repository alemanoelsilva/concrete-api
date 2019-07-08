const moment = require('moment');

const logger = require('../../config/logger');
const { session } = require('../../config/environment');

const adapter = require('./adapter');
const model = require('./model');
const repository = require('./repository')(model);
const {
  formatterUserRequest,
  formatterUserResponse,
  addMinutesOnDate,
  getCurrentDate,
} = require('./formatters');

const { onSuccess } = require('../helpers/handler-success');
const { onError } = require('../helpers/handler-error');
const { taskRunner } = require('../helpers/task-runner');
const {
  stringToArrayObject,
  arrayObjectToString,
} = require('../helpers/handler-string-array');

const validators = require('./validators');

const formatDate = 'MMMM Do YYYY, h:mm:ss a';

module.exports = ({
  signIn: (request, response) => adapter.login({
    body: request.body,
    repository: {
      find: repository.find,
      updateLastLoginTime: repository.update,
    },
    formatters: {
      response: formatterUserResponse({
        moment, formatDate, stringToArrayObject,
      }),
    },
    taskRunner: taskRunner({ logger }),
    validators,
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response),
  }),

  signUp: (request, response) => adapter.create({
    payload: request.body,
    repository: {
      save: repository.save,
    },
    formatters: {
      payload: formatterUserRequest({ arrayObjectToString }),
      response: formatterUserResponse({
        moment,
        formatDate,
        stringToArrayObject,
      }),
    },
    taskRunner: taskRunner({ logger }),
    validators,
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response),
  }),

  search: (request, response) => adapter.find({
    params: {
      id: request.params.id,
      token: request.headers.bearer,
    },
    repository: {
      findByID: repository.find,
    },
    formatters: {
      response: formatterUserResponse({
        moment, formatDate, stringToArrayObject,
      }),
    },
    taskRunner: taskRunner({
      logger,
      formatters: {
        getCurrentDate: getCurrentDate({ moment }),
        add30Minutes: addMinutesOnDate({ moment, addTime: session.duration }),
      },
    }),
    validators,
    logger,
    onSuccess: onSuccess(response),
    onError: onError(response),
  }),
});
