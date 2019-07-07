

const Joi = require('joi');

const {
  requestValidation,
  responseValidation,
} = require('../../api/helpers/schema-validation');

describe('Handler Schema Validation Unit tests', () => {
  const mock = {
    request: {
      body: { name: 'test', age: 1 },
      query: { name: 'test', age: 1 },
      params: { name: 'test', age: 1 },
    },
    response: {
      data: { name: 'test', age: 1 },
      status: jest.fn(() => ({
        json: jest.fn(() => ({
          end: jest.fn(),
        })),
      })),
    },
    next: jest.fn(data => data),
  };

  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().optional(),
  });

  beforeEach(() => jest.clearAllMocks());

  describe('Handler Request', () => {
    test('Should execute body validation with success', async () => {
      const result = requestValidation({
        schema,
        requestType: 'body',
      })(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    test('Should execute body validation with error', async () => {
      const result = requestValidation({
        schema: { name: 1 },
        requestType: 'body',
      })(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();

      expect(result.isJoi).toBeTruthy();
      expect(result.name).toEqual('ValidationError');
      expect(result.details[0].message).toEqual('"name" must be a number');
    });

    test('Should execute params validation with success', async () => {
      const result = requestValidation({
        schema,
        requestType: 'params',
      })(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    test('Should execute params validation with error', async () => {
      const result = requestValidation({
        schema: { name: 1 },
        requestType: 'params',
      })(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();

      expect(result.isJoi).toBeTruthy();
      expect(result.name).toEqual('ValidationError');
      expect(result.details[0].message).toEqual('"name" must be a number');
    });

    test('Should execute query validation with success', async () => {
      const result = requestValidation({
        schema,
        requestType: 'query',
      })(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    test('Should execute query validation with error', async () => {
      const result = requestValidation({
        schema: { name: 1 },
        requestType: 'query',
      })(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();

      expect(result.isJoi).toBeTruthy();
      expect(result.name).toEqual('ValidationError');
      expect(result.details[0].message).toEqual('"name" must be a number');
    });
  });

  describe('Handler Response', () => {
    test('Should execute response validation with success', async () => {
      responseValidation(schema)(mock.request, mock.response, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(0);

      expect(mock.response.status).toHaveBeenCalledTimes(1);
    });

    test('Should execute response validation with error', async () => {
      const result = responseValidation(schema)(mock.request, { ...mock.response, data: { name: 1 } }, mock.next);

      expect(mock.next).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();

      expect(mock.response.status).toHaveBeenCalledTimes(0);
      expect(mock.response.status().json).toHaveBeenCalledTimes(0);

      expect(result.isJoi).toBeTruthy();
      expect(result.name).toEqual('ValidationError');
      expect(result.details[0].message).toEqual('"name" must be a string');
    });
  });
});
