

const { connect } = require('../../config/sequelize');
const { db: { database, user, pass } } = require('../../config/environment');

const init = async () => {
  await connect({ database, user, pass });

  // jest.setTimeout(30000);
};

init();
