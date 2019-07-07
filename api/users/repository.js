const INVALID_EMAIL = 'SequelizeUniqueConstraintError';

module.exports = model => ({
  save: async (data) => {
    try {
      const result = await model.create(data);

      return result;
    } catch ({ name, ...err }) {
      if (name === INVALID_EMAIL) {
        const invalidEmail = new Error('E-mail já existente');
        invalidEmail.name = 'InvalidEmailConstraint';
        invalidEmail.details = [err];
        return invalidEmail;
      }

      throw err;
    }
  },

  find: async (params) => {
    const result = await model.findOne({ where: params });

    return result && result.dataValues ? result.dataValues : null;
  },

  update: id => model.update({
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }, { where: { id } }),

});
