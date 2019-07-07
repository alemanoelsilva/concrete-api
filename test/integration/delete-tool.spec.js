

const {
  requestGet,
  requestDelete,
} = require('../helpers');

const TOOLS_URL = '/api/tools';

const Tool = require('../../api/tools/model');

const {
  generateTools,
  populateDataOnDB,
} = require('../helpers');

describe('Delete Tool Integration Test', () => {
  beforeAll(async () => populateDataOnDB({ data: generateTools, model: Tool }));

  afterAll(async () => Tool.destroy({ where: {} }));

  describe('Delete tool with success', () => {
    test('Should return statusCode 200 - tool deleted', async () => {
      try {
        const { body, statusCode } = await requestDelete({
          url: TOOLS_URL,
          params: generateTools[0].id,
        });

        expect(statusCode).toEqual(200);
        expect(body.message).toEqual('Tool was deleted with success');
      } catch (error) {}
    });

    test('Should return statusCode 204 - tool was not found', async () => {
      try {
        const { body, statusCode } = await requestDelete({
          url: TOOLS_URL,
          params: `${generateTools[0].id.slice(0, 35)}9`,
        });

        expect(statusCode).toEqual(204);
      } catch (error) {}
    });
  });
});
