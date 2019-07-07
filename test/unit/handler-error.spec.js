

const handlerError = require('../../api/helpers/handler-error');

describe('Handler Error Unit tests', () => {
  const response = {
    status: jest.fn(() => ({
      json: jest.fn(),
    })),
  };

  const error = new Error('Error for testing');

  describe('Handler Error', () => {
    test('Should return an object of error treated with values default', async () => {
      handlerError(response)(error);

      expect(response.status).toBeCalled;
      expect(response.status().json).toBeCalled;
    });

    test('Should return an object of error treated when name and details was not informed', async () => {
      handlerError(response)({ ...error, name: null, details: null });

      expect(response.status).toBeCalled;
      expect(response.status().json).toBeCalled;
    });

    test('Should return an object of error treated when error is Joi', async () => {
      handlerError(response)({ ...error, isJoi: true });

      expect(response.status).toBeCalled;
      expect(response.status().json).toBeCalled;
    });
  });
});
