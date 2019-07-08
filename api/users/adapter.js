exports.login = async ({
  body,
  repository,
  formatters,
  taskRunner,
  validators,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('Logging with user', body.email);

    const user = await repository.find(body);

    taskRunner.addTasks([
      validators.hasUser({ user }),
    ]);

    const resultRunner = await taskRunner.exec();

    if (resultRunner && resultRunner.error) {
      return onError({
        message: resultRunner.message,
        statusCode: 401,
      });
    }

    logger.info('Updating the lastLogin time');

    await repository.updateLastLoginTime(user.id);

    return onSuccess({ data: formatters.response(user) });
  } catch (error) {
    logger.error(error);
    return onError(error);
  }
};

exports.create = async ({
  payload,
  repository,
  formatters,
  taskRunner,
  validators,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('Creating user with', payload);

    const responseDB = await repository.save(formatters.payload(payload));

    taskRunner.addTasks([
      validators.duplicatedEmail({ responseDB }),
    ]);

    const resultRunner = await taskRunner.exec();

    if (resultRunner && resultRunner.error) {
      return onError({
        message: resultRunner.message,
        statusCode: 400,
      });
    }

    return onSuccess({
      data: formatters.response(responseDB),
      statusCode: 201,
    });
  } catch (error) {
    logger.error(error);
    return onError(error);
  }
};

exports.find = async ({
  params,
  repository,
  formatters,
  taskRunner,
  validators,
  logger,
  onSuccess,
  onError,
}) => {
  try {
    logger.info('Finding user by', params);

    const user = await repository.findByID({ id: params.id });

    taskRunner.addTasks([
      validators.hasUser({ user }),
      validators.isValidToken({ user, paramsToken: params.token }),
      validators.isValidSession({ user }),
    ]);

    const resultRunner = await taskRunner.exec();

    if (resultRunner && resultRunner.error) {
      return onError({
        message: resultRunner.message,
        status: 401,
      });
    }

    return onSuccess({ data: formatters.response(user), statusCode: 200 });
  } catch (error) {
    logger.error(error);
    return onError(error);
  }
};
