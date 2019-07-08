const { connect, isConnectionOn } = require('./config/sequelize');
const logger = require('./config/logger');

const { app: { port } } = require('./config/environment');

async function init() {
  try {
    await connect();
    await isConnectionOn();
  } catch (error) {
    logger.error('There was an error on Autentication from SQLite DB', error);
    return null;
  }

  /*eslint-disable */
  const app = require('./app')();

  await app.listen(port);

  return logger.info(`Application is running on port ${port}`);
}

init();
