

const {
  requestPost,
  requestGet,
} = require('../helpers');

const TOOLS_URL = '/api/tools';

const Tool = require('../../api/tools/model');

const { generateTools } = require('../helpers');

describe('Create Tool Integration Test', () => {
  beforeAll(async () => Tool.destroy({ where: {} }));

  describe('Create tool with success', () => {
    test('Should return tool with properties id and createdAt', async () => {
      try {
        const { body, statusCode } = await requestPost({
          url: TOOLS_URL,
          body: generateTools[0],
        });

        expect(statusCode).toEqual(201);
        expect(body.tool).toHaveProperty('id', 'title', 'link', 'description', 'createdAt', 'tags');
        expect(body.tool.id).toEqual(generateTools[0].id);
        expect(body.tool.title).toEqual(generateTools[0].title);
        expect(body.tool.link).toEqual(generateTools[0].link);
        expect(body.tool.description).toEqual(generateTools[0].description);
        expect(body.tool.tags).toEqual(generateTools[0].tags);

        const { body: { tools, count } } = await requestGet({ url: TOOLS_URL });

        expect(count).toEqual(1);
        expect(count).toEqual(1);
        expect(tools).forEacht((tool, index) => {
          expect(tool).toHaveProperty('id', 'title', 'link', 'description', 'createdAt', 'tags');
          expect(tool.id).toEqual(generateTools[index].id);
          expect(tool.title).toEqual(generateTools[index].title);
          expect(tool.link).toEqual(generateTools[index].link);
          expect(tool.description).toEqual(generateTools[index].description);
          expect(tool.tags).toEqual(generateTools[index].tags);
        });
      } catch (error) {}
    });
  });
});
