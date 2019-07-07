require('dotenv').load();

const ENVIRONMENT = {
  TEST: 'test',
  DEV: 'development',
};

const env = process.env.NODE_ENV || ENVIRONMENT.DEV;

module.exports = {
  env,
  app: {
    port: process.env.PORT,
  },
  logger: {
    level: env === ENVIRONMENT.TEST ? 'fatal' : process.env.LOGGER_LEVEL,
    backupFileLog: process.env.BACKUP_FILE_LOG,
  },
  db: {
    database: env === ENVIRONMENT.TEST
      ? process.env.DATABASE_TEST
      : process.env.DATABASE,
  },
  crypto: {
    secret: process.env.SECRET,
  },
  session: {
    duration: process.env.SESSION_EXPIRED,
  },
};
