const Sequelize = require('sequelize');
const { getConnection } = require('../../config/sequelize');

const User = getConnection().define('user', {
  id: {
    type: Sequelize.UUID,
    field: '_id',
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phones: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
  lastLogin: {
    field: 'last_login',
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  token: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

User.sync({ force: false });

module.exports = User;
