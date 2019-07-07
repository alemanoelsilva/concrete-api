exports.hasUser = ({ user }) => ({ logger }) => {
  if (!user) {
    logger.info('User was not found');
    return {
      error: true,
      name: 'NotAllowed',
      message: 'Usuário não autorizado',
    };
  }

  return null;
};

exports.isValidToken = ({ user, paramsToken }) => ({ logger }) => {
  if (user.token !== paramsToken) {
    logger.info('Invalid Token');
    return {
      error: true,
      name: 'InvalidToken',
      message: 'Não autorizado',
    };
  }

  return null;
};

exports.isValidSession = ({ user }) => ({ logger, formatters }) => {
  if (formatters.getCurrentDate() > formatters.add30Minutes(user.lastLogin)) {
    logger.info('Session expired');
    return {
      error: true,
      name: 'InvalidSession',
      message: 'Não autorizado',
    };
  }

  return null;
};

exports.duplicatedEmail = ({ responseDB }) => ({ logger }) => {
  if (responseDB.name && responseDB.name === 'InvalidEmailConstraint') {
    logger.info('Invalid email');
    return {
      error: true,
      name: responseDB.name,
      message: responseDB.message,
      details: responseDB.details,
    };
  }

  return null;
};
