

const Joi = require('joi');

const {
  getRequestToolsSchema,
  getResponseToolsSchema,
  postRequestToolSchema,
  postResponseToolSchema,
  deleteRequestToolSchema,
  deleteResponseToolSchema,
} = require('../../api/tools/schemas');

const hasError = ({ data, schema }) => {
  const { error } = Joi.validate(data, schema);
  if (error) return true;
  return false;
};

describe('Tools Schemas Validation Unit tests', () => {
  const mock = {
    getRequestTools: {
      tag: 'test',
    },
    getResponseTools: {
      tools: [{
        id: '400117f1-1388-4eb9-a10f-c8b30e2b40b4',
        title: 'Title',
        link: 'Link',
        description: 'Description',
        tags: ['tag_1', 'tag_2'],
        createdAt: new Date().toISOString(),
      }],
      count: 1,
    },
    createRequestTool: {
      title: 'Title',
      link: 'Link',
      description: 'Description',
      tags: ['tag_1', 'tag_2'],
    },
    createResponseTool: {
      tool: {
        id: '400117f1-1388-4eb9-a10f-c8b30e2b40b4',
        title: 'Title',
        link: 'Link',
        description: 'Description',
        tags: ['tag_1', 'tag_2'],
        createdAt: new Date().toISOString(),
      },
    },
    deleteRequestTool: {
      id: '400117f1-1388-4eb9-a10f-c8b30e2b40b4',
    },
    deleteResponseTool: {
      message: 'Tool was deleted with success',
    },
  };

  describe('Validate Get All Tools Schema', () => {
    test('Should validate to request for get all tools schema with success', async () => {
      const result = hasError({
        data: mock.getRequestTools,
        schema: getRequestToolsSchema,
      });

      expect(result).toBeFalsy();
    });

    test('Should validate to request for get all tools schema with error', async () => {
      const result = hasError({
        data: { tag: 1 },
        schema: getRequestToolsSchema,
      });

      expect(result).toBeTruthy();
    });

    test('Should validate to response for get all tools schema with success', async () => {
      const result = hasError({
        data: mock.getResponseTools,
        schema: getResponseToolsSchema,
      });

      expect(result).toBeFalsy();
    });

    test('Should validate to response for get all tools schema with error', async () => {
      const result = hasError({
        data: { ...mock.getResponseTools, count: 'it is not number' },
        schema: getResponseToolsSchema,
      });

      expect(result).toBeTruthy();
    });
  });

  describe('Validate Create Tool Schema', () => {
    test('Should validate to request for create tool schema with success', async () => {
      const result = hasError({
        data: mock.createRequestTool,
        schema: postRequestToolSchema,
      });

      expect(result).toBeFalsy();
    });

    test('Should validate to request for create tool schema with error', async () => {
      const result = hasError({
        data: { ...mock.createRequestTool, tags: 'it is not array' },
        schema: postRequestToolSchema,
      });

      expect(result).toBeTruthy();
    });

    test('Should validate to response for create tool schema with success', async () => {
      const result = hasError({
        data: mock.createResponseTool,
        schema: postResponseToolSchema,
      });

      expect(result).toBeFalsy();
    });

    test('Should validate to response for create tool schema with error', async () => {
      const result = hasError({
        data: { ...mock.createResponseTool, id: 1 },
        schema: postResponseToolSchema,
      });

      expect(result).toBeTruthy();
    });
  });

  describe('Validate Delete Tool Schema', () => {
    test('Should validate to request for delete tool schema with success', async () => {
      const result = hasError({
        data: mock.deleteRequestTool,
        schema: deleteRequestToolSchema,
      });

      expect(result).toBeFalsy();
    });

    test('Should validate to request for delete tool schema with error', async () => {
      const result = hasError({
        data: { id: 1 },
        schema: deleteRequestToolSchema,
      });

      expect(result).toBeTruthy();
    });

    test('Should validate to response for delete tool schema with success', async () => {
      const result = hasError({
        data: mock.deleteResponseTool,
        schema: deleteResponseToolSchema,
      });

      expect(result).toBeFalsy();
    });

    test('Should validate to response for delete tool schema with error', async () => {
      const result = hasError({
        data: { message: 1 },
        schema: deleteResponseToolSchema,
      });

      expect(result).toBeTruthy();
    });
  });
});
