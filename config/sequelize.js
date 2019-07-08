const path = require('path');
const Sequelize = require('sequelize');
const logger = require('./logger');

const { db: { database } } = require('./environment');

let connection = null;

const sequelizeDB = ({
  connect: async () => {
    if (connection) return connection;

    logger.info(`Connecting on database ${database}`);

    try {
      connection = new Sequelize({
        dialect: 'sqlite',
        storage: path.join(path.resolve(), database),
        operatorsAliases: Sequelize.Op,
        logging: false,
      });

      logger.info('Database connected');

      return connection;
    } catch (error) {
      logger.error(`There was an error on the connection ${error}`);
      return null;
    }
  },

  disconnect: () => {
    connection.close();
  },

  getConnection: () => connection,

  isConnectionOn: () => {
    connection.authenticate();
  },

});

module.exports = sequelizeDB;
